import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,Button,Image, PermissionsAndroid, ScrollView, LogBox,TouchableOpacity,ActivityIndicator,Dimensions } from "react-native";
import { NativeBaseProvider, Center,Box,Select,CheckIcon,Slider, Stack} from "native-base";
import Header from './header'
import Footer from './footer'
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import port from "../port";
import axios from 'axios';
const { width, height } = Dimensions.get('window');

const wp = (percentage) => {
  return width * (percentage / 100);
};

const hp = (percentage) => {
  return height * (percentage / 100);
};
function RapportPriceMapDet({ route }){

  const { Category,categoryId,adm } = route.params;

    const [color,setColor]=React.useState('')
    const [onChangeValue, setOnChangeValue] = React.useState(0);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);
    const [unite,setUnite]=React.useState('')
    const [marques,setMarques]=React.useState([])
    const [references,setReferences]=React.useState([])
    const [categories,setCategories]=React.useState(Category)
    const [prix, setPrix] = useState({});
    const [priceError, setPriceError] = useState({});

    const [loading, setLoading] = useState(true);

    const [marqueNames, setMarqueNames] = useState([]); // State to store fetched marque names
    const [articles,setArticles]= useState([])
    const [colors,setColors]=useState([])
    const WHIRLPOOL_LOGO=require('../../../assets/WHIRLPOOL_LOGO.png')
    console.log(marqueNames);
    
    const Couleur=colors
    const tdc=["L", "KG", "Nbre de feu", "COUVERTS","cm"]  
    const dataArt={ 
      couleur:color,
      unite:unite
    }
    /////////////////////////Functions///////////////////////////
    useEffect(() => {
      references.forEach(ref => {
        articles.forEach(article => {
          if (article.Reference_idReference === ref.idReference) {
            fetchPrice(ref.idReference);
      }
        });
      });
    }, [articles, references]);
    const fetchPrice = async (idref) => {
      try {
        const response = await axios.get(`${port}/api/expositions/expositions`);
        const priceData = response.data.find(e => e.Reference_idReference === idref);
        
        if (!priceData || priceData.prix === null || priceData.prix === undefined) {
          setPrix(prev => ({ ...prev, [idref]: 'Prix non disponible' }));
        } else {
          setPrix(prev => ({ ...prev, [idref]: priceData.prix }));
        }
      } catch (error) {
        setPriceError(prev => ({ ...prev, [idref]: 'Erreur lors de la récupération' }));
      }
    };
    
    
    
    

    const fetchReferences = async () => {
      try {
        const response = await axios.get(`${port}/api/reference/referencebycateg/${categoryId}`);
        setReferences(response.data);
        await fetchMarqueNames(response.data); // Fetch marque names after references are fetched
      } catch (error) {
        console.error('Error fetching references:', error);
      }
    };
    
    const fetchcolor = async () => {
      try {
        const response = await axios.get(`${port}/api/articles/colors`);
        const uniqueColors = [...new Set(response.data)];
        setColors(uniqueColors);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };
    
    // Fetch marque names based on IDs from references
    const fetchMarqueNames = async (references) => {
      try {
        const uniqueMarqueIds = [...new Set(references.map(ref => ref.Marque_idMarque))];
        const namesPromises = uniqueMarqueIds.map(id => fetchMarqueById(id));
        const names = await Promise.all(namesPromises);
        setMarqueNames(names);
      } catch (error) {
        console.error('Error fetching marque names:', error);
      }
    };
    
    // Fetch marque name by ID
    const fetchMarqueById = async (id) => {
      try {
        const response = await axios.get(`${port}/api/marques/marques/${id}`);
        return response.data.marquename;
      } catch (error) {
        console.error('Error fetching marque:', error);
        return ''; // Return an empty string in case of error to prevent rendering an object
      }
    };
    
    const fetchArticlbyCU = async (colorr, unitee) => {
      try {
        if (colorr === color && unitee === unite) {
          const response = await axios.post(`${port}/api/articles/articlesCU`, {
            couleur: colorr,
            unite: unitee
          });
          setArticles(response.data);
        }
      } catch (error) {
        console.error('Error fetching Article:', error);
      }
    };
    
    React.useEffect(() => {
      const fetchData = async () => {
        await fetchReferences();
        await fetchArticlbyCU(color, unite);
        await fetchcolor();
        setLoading(false); // Mettre à jour l'état de chargement ici
      };
    
      fetchData();
    }, [color, unite]);
    
    /////////////////////////Functions///////////////////////////

    const Example = ({text}) => {
      if (text == "Couleur") {
        return (
          <Center> 
            <Box maxW="400">
              <Select
                selectedValue={color}
                minWidth="100%"
                accessibilityLabel="Choose Service"
                placeholder={text}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setColor(itemValue)}
              >
                {/* Mapping over the unique colors */}
                {[...new Set(Couleur)].map(el => (
                  <Select.Item key={el} label={el} value={el} />
                ))}
              </Select>
            </Box>
          </Center>
        );
      }
    else{
        return(
            <Center>
            <Box maxW="400" ml='-280'>
              <Select
                selectedValue={unite}
                minWidth="32%"
                
                accessibilityLabel="Choose Service"
                placeholder={text}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setUnite(itemValue)}
              >
               {tdc.map(el=>(
                <Select.Item label={el} value={el} />
               ))}
              </Select>
            </Box>
          </Center>
        )
    }
    }
      const ExampleSlider = () => {
        return (
        <Box mr='-5'ml='5' w="100%">
      <Slider w="100" maxW="110" defaultValue={onChangeValue} minValue={0} maxValue={1000} accessibilityLabel="hello world"  step={100} 
      onChange={v => {
        setOnChangeValue(Math.floor(v));
      }}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </Box>
        );
    };
    const exportToExcel = async () => {
      const data = [
        ["Marque", "References", "Capacité", "Prix"],
        ...articles.map(article => [
          fetchMarqueById(article.Marque_idMarque),
          references.find(ref => ref.idReference === article.Reference_idReference)?.Referencename || "",
          article.capacite,
          prix[article.Reference_idReference] || "Non disponible"
        ])
      ];
    
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Rapport Expo", true);
    
      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      const uri = FileSystem.cacheDirectory + 'rapport_expo.xlsx';
      await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
      await Sharing.shareAsync(uri);
    };

const Tableaux = () => {
  return (
    <View style={{ marginTop: 20, marginBottom:20 }}>
      <View style={styles.container}>
        {/* Première ligne */}
        <View style={styles.row}>
          <View style={styles.cell}><Text>Marque</Text></View>
          <View style={styles.cell}><Text>References</Text></View>
          <View style={styles.cell}><Text>Capacité</Text></View>
          <View style={styles.cell}><Text>Prix</Text></View>
        </View>

        {/* Rows with references */}
        {references.map((el, index) => (
          articles.filter(item => item.Reference_idReference === el.idReference && item.capacite <= onChangeValue).map((article, idx) => (
            <View style={styles.row} key={index + '-' + idx}>
              <View style={styles.cell1}><Text>{fetchMarqueById(el.Marque_idMarque)}</Text></View>
              <View style={styles.cell1}><Text style={styles.textcell1}>{el.Referencename}</Text></View>
              <View style={styles.cell1}><Text>{article.capacite}</Text></View>
              <View style={styles.cell1}>
                <Text>
                  
                  { prix[article.Reference_idReference] 
                    ? prix[article.Reference_idReference] 
                    : priceError[article.Reference_idReference] 
                    ? priceError[article.Reference_idReference] 
                    : "Chargement du prix..." }
                </Text>
              </View>
            </View>
          ))
        ))}
      </View>
    </View>
  );
};

return (
  <NativeBaseProvider>
    <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />
    <View style={styles.container}>
      {loading ? (
        <Center flex={1}>
          <ActivityIndicator size="large" color="#FDC100" />
        </Center>
      ) : (
        <ScrollView style={styles.scrollView}>
          <Center>
            <Text style={styles.title}>Rapports Price Map :</Text>
            <Example text={'Couleur'} />
            <View style={styles.row1}>
              <Text style={styles.label}>Capacité</Text>
              <Text>{onChangeValue}</Text>
              <ExampleSlider />
              <Example text={'Unite'} />
            </View>
          </Center>
          {Tableaux()}
        </ScrollView>
      )}
      <Center>
        <TouchableOpacity onPress={exportToExcel} style={styles.btns}>
          <Text style={styles.btnText}>Exporter</Text>
        </TouchableOpacity>
      </Center>
      <Footer adm={adm} />
    </View>
  </NativeBaseProvider>
);

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:"10%",
    },
    image12: {
      width: width * 0.4, // 30% of screen width
      height: height * 0.2, // 20% of screen height
      position: "absolute",
      top: 0,
      left: width * 0.3, // 3% of screen width
    },
    scrollView: {
        flex: 1,
        padding: 20,
        marginTop:'20%'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 30,
    },
    row1: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 90,
        marginRight:5
    },
    textexpo:{
        fontSize: 15,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
      },
      cell: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5, 
        borderColor: '#D0D3D4', 
      },
      cell1: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0D3D4', // Background color of the button
        borderWidth: 0.5, 
        borderColor: '#D0D3D4', 
      },
      cell2:{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDC100', // Background color of the button
        borderWidth: 0.5, 
        borderColor: '#D0D3D4',
      },
      totalRow: {
        borderTopWidth: 1,
        borderColor: 'black',
      },
      totalCell: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      textcell2:{
        color: 'white', // Text color
      },
      btns: {
        backgroundColor: '#FDC100', // Background color of the button
        padding: 10,
        borderRadius: 5,
        width:150,
        marginTop:"5%",
        marginBottom:'10%',
        alignItems: 'center',
      },
      btnText: {
        color: 'white', // Text color
        fontSize: 16,
        textAlign:"center"
      },
})
export default RapportPriceMapDet;