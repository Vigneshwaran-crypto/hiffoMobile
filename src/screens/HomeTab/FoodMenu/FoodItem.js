import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../common/colors";
import { textFontFace, textFontFaceLight, textFontFaceMedium, textFontFaceSemiBold } from "../../../common/styles";
import EnTypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from "react-native-linear-gradient";



const FoodItem = ({item,index})=>{
    return(
        <TouchableOpacity style={styles.foodItemParent} key={index} >
  
          <View style={styles.itemImageView} >
         <Image 
         style={styles.foodItemImage}
         source={item.imagePath}
         />
          </View>
  
         <View style={styles.foodItemTexts} >
  
          <Text style={styles.foodName} >{item.name}</Text>
          <Text style={styles.foodItemQuantity} >{item.quantity}</Text>
         
          <View style={styles.foodItemPriceView} >
            <Text style={styles.foodItemPrice} >{item.price}</Text>
  
  
           <View style={styles.addFoodQuantityView}>

            <TouchableOpacity
            style={styles.itemAddButton}
            >

           <LinearGradient
           colors={[colors.subTextColor,colors.tanGrey]}
           start={{x:1,y:0}}
           end={{x:0,y:0}}
           style={styles.addGradient}
            >
            <Text style={styles.addText}>Show</Text>
           </LinearGradient>
           </TouchableOpacity>


           <TouchableOpacity
            style={styles.itemAddButton}
            >

           <LinearGradient
          colors={[colors.buttonGreen,colors.activeGreen]}
          start={{x:0,y:0}}
          end={{x:1,y:0}}
           style={styles.addGradient}
            >
            <Text style={styles.addText}>Hide</Text>
           </LinearGradient>
           </TouchableOpacity>


           <TouchableOpacity
            style={styles.itemAddButton}
            >

           <LinearGradient
           colors={[colors.subTextColor,colors.tanGrey]}
           start={{x:0,y:0}}
           end={{x:1,y:0}}
           style={styles.addGradient}
            >
            <Text style={styles.addText}>Restock</Text>
           </LinearGradient>
           </TouchableOpacity>



           <TouchableOpacity style={styles.itemRoundButton} >
            <EnTypo name="link" size={20} color={colors.mildBg}/>
           </TouchableOpacity>

           <TouchableOpacity style={styles.itemRoundButton} >
           <Feather name="trash-2" size={20} color={colors.mildBg}/>
          </TouchableOpacity>


           </View>

  
          </View>

         </View>
        </TouchableOpacity>
      )
}



const styles = StyleSheet.create({

    foodItemParent:{
        flexDirection:"row",
        borderWidth:1,
        borderColor:colors.itemBorderGrey,
        marginTop:15,
        padding:20,
        paddingVertical:28,
        backgroundColor:colors.mildBg,
        borderRadius:25,
        width:"100%"
      },
      itemImageView:{
        elevation:15,
        shadowColor:colors.black,
        shadowOpacity:10,
        backgroundColor:colors.white,
        height:75,
        width:75,
        borderRadius:50,
        padding:0.3

      },
      foodItemImage:{
        height:75,
        width:75,
        borderRadius:50,
        resizeMode:"cover",
      
      },
      foodItemTexts:{
        marginStart:20
      },
      foodName:{
        color:colors.black,
        fontFamily:textFontFaceMedium
      },
      foodItemQuantity:{
        color:colors.subTextColor,
        fontFamily:textFontFace
      },
      foodItemPrice:{
        color:colors.black,
        fontFamily:textFontFaceLight,
        marginTop:5,
        width:"20%"
      },
      foodItemPriceView:{
        flexDirection:"row",
        width:"73%",
        justifyContent:"space-between",
        alignItems:"center",
        // borderWidth:1
      },
      addFoodQuantityView:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        // borderWidth:1,
      },
      itemAddButton:{
        height:35,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,

        elevation:2,
        backgroundColor:colors.transparent,
        shadowColor:colors.black,
        shadowOpacity:20,
        padding:0.1,
        width:"25%",
        marginEnd:15
      },
        addGradient:{
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        width:"100%"
    },
    plusText:{
        fontFamily:textFontFaceSemiBold,
        fontSize:15
    },
      addText:{
        marginVertical:5,
        fontFamily:textFontFaceLight,
        color:colors.mildBg,
      },
      itemRoundButton:{
        height:32,
        width:32,
        borderRadius:17,
        alignItems:"center",
        justifyContent:"center",
        marginEnd:10,
        backgroundColor:colors.subTextColor
      }
})

export default FoodItem;