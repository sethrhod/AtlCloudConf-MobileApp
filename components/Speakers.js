import { StyleSheet, SafeAreaView, FlatList, StatusBar, View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

const Item = (props) => (
  <View style={styles.item}>

    {/*profile pic*/}

    <Image style={styles.logo} source={{uri: props.uri}}/>

    {/*Name and links*/}

    <View style={{ maxWidth: 130, alignItems: 'center' }}>
      <Text style={styles.name}>{props.fullName}</Text>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        {props.links.map((link, index) => 
          {var title = link.title;
            // an if statement to catch the company website link and change the icon to a briefcase
            {if (title == "Company Website") {title = "Briefcase"}}
            return (
              <View key={index} style={{ justifyContent: 'center', padding: 5 }}>
                <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
                  <FontAwesome5 name={title.toLowerCase()} size={20} color="#0099CC" item_container/>
                </TouchableOpacity>
              </View>
          )}
        )}
      </View>
    </View>

    {/*bio*/}

    <View style={{ width: 120 }}>
      <Text style={styles.bio}>{props.tagLine}</Text>
    </View>
  </View>
);

export default function Speakers() {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("https://sessionize.com/api/v2/curiktb3/view/Speakers")
    .then(response => response.json())
    .then(data => setData(data))
  }, [])

  return (
    <LinearGradient
      Background
      Linear
      Gradient
      colors={["rgba(0,0,0,1)", "rgba(0,47,63,1)"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.item_container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item fullName={item.fullName} uri={item.profilePicture} tagLine={item.tagLine} links={item.links} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{alignItems: 'stretch'}}
          style={{ width: '100%' }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item_container: {
    flex: 1,
    width: '100%',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: "row",
    justifyContent: 'space-between',
    borderRadius: 15,
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 20,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  bio: {
    fontSize: 12,
  },
  logo: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  link: {
    color: '#0099CC'
  }
});

