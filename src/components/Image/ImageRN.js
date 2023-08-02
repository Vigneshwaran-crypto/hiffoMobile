/**
 * Image Rn component is cached image
 * Important Props :
 * style -
 * source -
 * fileName -
 * coverImage- optional
 * profileImage - optional
 * resizeMode - optional
 * autoHeight - optional (Auto height props =  width - not optional)
 */

import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../common/colors";
import RnFs, { unlink } from "react-native-fs";
import { FilePathCache, LOG } from "../../common/util";
import AutoHeightImage from "react-native-auto-height-image";

var sh = require("shorthash");

const ImageRn = (props) => {
  const filePrefix = "file://";
  // const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(props.source ? props.source : "");
  const [FirstTimeError, setFirsTimeError] = useState(true);

  const filePath = FilePathCache + sh.unique(props.fileName);
  // LOG("File NAme : " + props.source);
  // LOG("File NAme : " + sh.unique(props.fileName));
  // LOG("File Path : ", filePath);

  // useEffect(() => {
  //   LOG("Image URl " + imageUrl);
  // }, [imageUrl]);

  useEffect(() => {
    // LOG("Imagern called------" + props.source);

    let mounted = true;

    if (props.source) {
      if (props.source.startsWith("file:")) {
        if (mounted) setImageUrl(props.source);
      } else {
        RnFs.exists(filePath)
          .then((exists) => {
            // LOG("File Existence : ", exists);
            if (exists) {
              // LOG("Exist ", filePath);
              // setIsLoading(false);
              if (mounted) setImageUrl(filePrefix + filePath);
            } else {
              // LOG("Not Exists;");

              // LOG("Props.source :", props.source);
              // LOG("REFINDED URL , ", props.source.replaceAll(" ", "%20"));
              RnFs.downloadFile({
                fromUrl: props.source.replaceAll(" ", "%20"),
                toFile: filePath,
                background: true,
              })
                .promise.then((res) => {
                  // LOG("Loaded Successfully;");
                  // setIsLoading(false);
                  if (mounted) setImageUrl(filePrefix + filePath);
                })
                .catch((e) => {
                  // LOG("File Path", props.source);
                  // LOG("Error On Four,", e);
                  // setIsLoading(false);
                  unlink(filePath);
                  if (mounted) setImageUrl(props.source ? props.source : "");
                });
            }
          })
          .catch((e) => {
            // LOG("Error On First,", e);
            // setIsLoading(false);
            if (mounted)
              setImageUrl(
                props.source ? props.source.replaceAll(" ", "%20") : ""
              );
          });
      }
    } else {
      if (mounted) setImageUrl("");
    }

    return () => {
      mounted = false;
    };
  }, []);

  function downLoadImage() {
    // LOG("Entered flow");
  }

  const onImageError = (e) => {
    LOG("On Image Loading Error :", e);

    if (FirstTimeError) {
      // LOG("Firstime error");
      setFirsTimeError(false);
      setImageUrl(props.source ? props.source : "");
    } else {
      // LOG("Not First error");
      setImageUrl("");
    }
    // setIsLoading(false);
  };

  return (
    <View style={{ alignSelf: props.autoHeight ? "center" : "auto" }}>
      {props.autoHeight ? (
        <AutoHeightImage
          style={[{ backgroundColor: colors.editTextGrey }, props.style]}
          source={
            imageUrl
              ? { uri: imageUrl }
              : props.profileImage
              ? require("../../Assests/image_broken.png")
              : props.coverImage
              ? require("../../Assests/image_broken.png")
              : require("../../Assests/image_broken.png")
          }
          onError={onImageError}
          resizeMode={props.resizeMode}
          width={props.width}
        />
      ) : (
        <Image
          key={props.key ? props.key : sh.unique(props.fileName)}
          style={[
            props.style,
            {
              backgroundColor: props.coverImage
                ? colors.white
                : colors.editTextGrey,
            },
          ]}
          source={
            imageUrl
              ? { uri: imageUrl }
              : props.profileImage
              ? require("../../Assests/image_broken.png")
              : props.coverImage
              ? require("../../Assests/image_broken.png")
              : require("../../Assests/image_broken.png")
          }
          onError={onImageError}
          resizeMode={props.resizeMode}
        />
      )}
    </View>
  );
};

const MemoizedImage = React.memo(ImageRn);

export default MemoizedImage;
