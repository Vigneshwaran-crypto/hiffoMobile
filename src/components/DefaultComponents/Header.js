import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { textFontFaceMedium } from "../../common/styles";
import { colors } from "../../common/colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const Header = ({title,subText})=>{



    return (
        <View style={styles.titleView}>
          <Image
            source={require("../../../Assests/images/hiffoTitle.png")}
            style={styles.titleImage}
          />

          <View>
            <Text style={styles.hotelNameText}>
              <FontAwesome5 name="hotel" color={colors.logoBlue} size={20} />{" "}
              Adyar Anandha bahavan
            </Text>
            <Text style={styles.hotelBranchText}>{subText}</Text>
          </View>
        </View>
    )
}


const styles = StyleSheet.create({

    titleView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignSelf:"center",
        marginTop:15
      },
      titleImage: {
        resizeMode: "cover",
        height: "100%",
        width: "45%",
        marginStart: -15,
      },
      hotelNameText: {
        color: colors.logoBlue,
        fontFamily: textFontFaceMedium,
        fontSize: 14,
      },
      hotelBranchText: {
        alignSelf: "flex-end",
        color: colors.logoBlue,
        fontFamily: textFontFaceMedium,
      },
})
export default Header;