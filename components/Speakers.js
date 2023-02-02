import { StyleSheet, SafeAreaView, FlatList, StatusBar, View, Text, Image, Linking } from "react-native";
import React, { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

const Item = (props) => (
  <View style={styles.item}>

    {/*profile pic*/}

    <Image style={styles.logo} source={{uri: props.uri}}/>

    {/*Name and links*/}

    <View style={{ alignItems: 'center' }}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        {props.links.map((link) => 
          {var title = link.title;
            return (
              <View style={{ justifyContent: 'center', padding: 5 }}>
                <FontAwesome5 name={title.toLowerCase()} size={17} color="#0099CC" item_container/>
              </View>
          )}
        )}
      </View>
    </View>

    {/*bio*/}

    <View style={{ width: 120 }}>
      <Text style={styles.bio}>{props.bio}</Text>
    </View>
  </View>
);

export default function Speakers() {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("https://sessionize.com/api/v2/jl4ktls0/view/Speakers")
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
          renderItem={({ item }) => <Item title={item.fullName} uri={item.profilePicture} bio={item.bio} links={item.links} />}
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
  title: {
    fontSize: 20,
    alignSelf: 'flex-start'
  },
  bio: {
    fontSize: 12,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  link: {
    color: '#0099CC'
  }
});

