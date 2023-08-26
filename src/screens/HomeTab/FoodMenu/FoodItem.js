import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../common/colors";
import { textFontFace, textFontFaceLight, textFontFaceMedium, textFontFaceSemiBold } from "../../../common/styles";
import EnTypo from 'react-native-vector-icons/Entypo'
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
  
  
           {item.type == "add" ? (
            <View style={styles.addFoodQuantityView}>

              <TouchableOpacity style={[styles.foodItemAddButton,{backgroundColor:colors.greyC4}]} >
                <EnTypo
                name="minus"
                size={25}
                color={colors.black29}
                />
              </TouchableOpacity>

                <Text style={styles.quantityText} >5</Text>


              <TouchableOpacity style={styles.foodItemAddButton} >
              <LinearGradient
           colors={[colors.buttonGreen,colors.activeGreen]}
           start={{x:0,y:0}}
           end={{x:1,y:0}}
           style={styles.foodItemAddButton}
            >
                <EnTypo
                name="plus"
                size={22}
                color={colors.white}
                />
                </LinearGradient>
              </TouchableOpacity>

            </View>
           ) : (
            <View style={styles.addFoodQuantityView}>

            <TouchableOpacity
            style={styles.itemAddButton}
            >

           <LinearGradient
           colors={[colors.buttonGreen,colors.activeGreen]}
           start={{x:0,y:0}}
           end={{x:1,y:0}}
           style={styles.addGradient}
            >
            <Text style={styles.addText}> <Text style={styles.plusText}>+ </Text>Add</Text>
           </LinearGradient>
           </TouchableOpacity>

           </View>

           )}
  
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
        marginTop:5
      },
      foodItemPriceView:{
        flexDirection:"row",
        // borderWidth:1,
        width:"60%",
        justifyContent:"space-between",
        alignItems:"center"
      },
      addFoodQuantityView:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:"70%",
        paddingStart:30
      },
      foodItemAddButton:{
        height:35,
        width:35,
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",

        elevation:2,
        backgroundColor:colors.transparent
      },
      quantityText:{
        marginHorizontal:15,
        fontFamily:textFontFaceLight,
        color:colors.black,
        fontSize:16,
        marginTop:5
      },
      itemAddButton:{
        height:35,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,

        elevation:5,
        backgroundColor:colors.transparent,
        shadowColor:colors.black,
        shadowOpacity:20,
        padding:0.1
      },
        addGradient:{
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
    },
    plusText:{
        fontFamily:textFontFaceSemiBold,
        fontSize:15
    },
      addText:{
        marginVertical:5,
        fontFamily:textFontFaceLight,
        color:colors.white,
        marginHorizontal:15,
        marginEnd:19,
      }
})

export default FoodItem;