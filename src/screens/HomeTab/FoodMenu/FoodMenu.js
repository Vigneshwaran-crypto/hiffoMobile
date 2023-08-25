import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {  FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../../common/colors";
import Header from "../../../components/DefaultComponents/Header";
import { textFontFace, textFontFaceLight, textFontFaceMedium } from "../../../common/styles";
import Feather from 'react-native-vector-icons/Feather'


const FoodMenu = () => {
  const navigation = useNavigation();

  const [categoryFocus,setCategoryFocus] = useState({id:1,value:"Indian"})


  const categoryList = [{id:1,value:"Indian"},{id:2,value:"Chinese"},{id:3,value:"Italian"},{id:4,value:"Sea food"},{id:5,value:"Chats"},{id:6,value:"+"}]

  const foodList = [
    {id:1,name:"Meals with indian chars",price:"250 ₹",quantity:"200 g",type:true,imagePath:require('../../../../Assests/images/meals.jpg')},
    {id:2,name:"Muttom Kozhambu",price:"200 ₹",quantity:"200 g",type:true,imagePath:require('../../../../Assests/images/mutton.jpg')},
    {id:3,name:"Sea Food",price:"350 ₹",quantity:"200 g",type:true,imagePath:require('../../../../Assests/images/seaFood.jpg')},
    {id:4,name:"Chapati and Salna",price:"150 ₹",quantity:"2 pcs",type:true,imagePath:require('../../../../Assests/images/chapati.jpg')},
    {id:5,name:"South Indian Filter Coffee",price:"50 ₹",quantity:"60 ml",type:true,imagePath:require('../../../../Assests/images/coffee.jpg')},
  ]

  const foodCategoryRender  = ({item,index})=>{
    return (
      <TouchableOpacity style={[styles.categoryParent,{borderColor:categoryFocus.id == item.id ? colors.logoBlue : colors.transparent}]}  key={index} onPress={()=>{setCategoryFocus(item)}} >
        <Text style={styles.categoryItemText} >{item.value}</Text>
      </TouchableOpacity>
    )
  }

  const foodItemRenderer = ({item,ind})=>{

    return(
      <View style={styles.foodItemParent} key={ind} >

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

        </View>
       </View>
      </View>
    )
  }

  return (
    <View style={styles.container} >
      <Header title={"Adyar Anandha bahavan"} subText={"HID544789"} />

<View style={styles.screenContent} >

      <View style={styles.foodTab}>

        <View style={styles.foodTabContainer} > 
        <TouchableOpacity style={[styles.tabButton,{marginEnd:5}]} >
        <Text style={styles.tabButtonText} > Food Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} >
       <Text style={styles.tabButtonText}>Add-Ons</Text>
        </TouchableOpacity>
        </View>


        <View style={styles.searchView} >
          <TextInput placeholder="Search" style={styles.searchInput} />
          <Feather name="search" size={21} color={colors.grey}  style={styles.searchIcon} />
        </View>

      </View>

<View  >

    {/* Food category list */}
      <FlatList
      data={categoryList}
      renderItem={foodCategoryRender}
      keyExtractor={(itm,ind)=> ind}
      horizontal={true}
      contentContainerStyle={styles.categoryListContainer}
      />



<FlatList
      data={foodList}
      renderItem={foodItemRenderer}
      keyExtractor={(itm,ind)=> ind}
      contentContainerStyle={styles.foodListContainer}
      />
</View>


</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  screenContent:{
    flex:1,
    width:"90%",
    alignSelf:"center",
    marginTop:15
  },
  foodTab:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:15
  },
  foodTabContainer:{
    flexDirection:"row",
    width:"50%"
  },
  tabButton:{
    borderWidth:1,
    width:"45%",
    alignItems:"center",
    borderColor:colors.greyBC,
    borderRadius:8,
    paddingVertical:5,
  },
  tabButtonText:{
    color:colors.black,
    fontFamily:textFontFaceMedium,
    fontSize:12,
    marginTop:3
  },
  searchView:{
    width:"45%",
    borderWidth:1,
    borderColor:colors.greyBC,
borderRadius:8,
paddingStart:10,
flexDirection:"row",
alignItems:"center",
backgroundColor:colors.thingrey
  },
  searchInput:{
    paddingVertical:3,
    flex:1
  },
  searchIcon:{
    marginHorizontal:8
  },
  categoryListContainer:{
    marginTop:15,
  },
  categoryParent:{
    borderWidth:1,
    height:60,
    width:60,
    borderRadius:30,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:10,
backgroundColor:colors.thingrey,
borderColor:colors.logoBlue

  },
  categoryItemText:{
    textAlign:"justify",
    fontFamily:textFontFaceMedium,
    fontSize:12,
    color:colors.black,
  },
  foodListContainer:{
  marginTop:20
  },
  foodItemParent:{
    flexDirection:"row",
    borderWidth:1,
    borderColor:colors.itemBorderGrey,
    marginTop:15,
    padding:20,
    paddingVertical:28,
    backgroundColor:colors.mildBg,
    borderRadius:25,
    
  },
  itemImageView:{
    elevation:15,
    shadowColor:colors.black,
    shadowOpacity:10,
    backgroundColor:colors.white,
    height:75,
    width:75,
    borderRadius:50,
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
  foodItemPriceView:{},
});

export default FoodMenu;
