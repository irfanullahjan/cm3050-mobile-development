import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { createStackNavigator, } from "@react-navigation/stack";
import { TableView, Cell, Section } from "react-native-tableview-simple";

export default function App() {
  // stack navigator is a container for the screens
  // each screen is a component

  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Restaurants" component={HomeScreen} />
            <Stack.Screen name="Menu" component={Menu} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const restaurants = [
    {
      title: "Joe's Gelato",
      tagline: "Desert, Ice cream, £££",
      eta: "10-30",
      imgUri: require('./assets/joes-gelato.jpeg')
    }, {
      title: "Joe's Dinner",
      tagline: "American, burgers, ££",
      eta: "50+",
      imgUri: require('./assets/joes-diner.jpeg')
    }
  ];

  return (
    <View>
      <ScrollView>
        <TableView>
          <Section header="" hideSeparator={true}>
            {restaurants.map(restaurant => (
              <HomeScreenCell key={restaurant.title} {...restaurant} action={() => navigation.navigate("Menu", {
                title: restaurant.title
              })} />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}

function HomeScreenCell(props) {
  const { title, tagline, eta, imgUri, action } = props;
  return (
    <Cell
      backgroundColor="transparent"
      highlightUnderlayColor="#CCC"
      cellContentView={
        <View style={styles.cellContentView}>
          <View style={styles.cellImageView}>
            <Image source={imgUri} style={styles.cellImage} />
          </View>
          <View style={styles.cellTextView}>
            <Text style={styles.cellTitle}>{title}</Text>
            <Text style={styles.cellTagline}>{tagline}</Text>
            <View style={styles.cellEta}>
            <Text style={styles.cellEtaText}>{eta}{"\n"}mins</Text>
            </View>
          </View>
        </View>
      }
      onPress={action}
    />
  )
}

function Menu(props) {
  const { title } = props.route.params;
  const menus = {
    "Joe's Gelato": [
      {
        title: "Vanilla Ice Cream",
        price: "££",
      }, {
        title: "Chocolate Ice Cream",
        price: "££",
      }, {
        title: "Strawberry Ice Cream",
        price: "££",
      }
    ],
    "Joe's Dinner": [
      {
        title: "Steak",
        price: "£££",
      }, {
        title: "Chicken",
        price: "££",
      }
    ]
  }

  return (
    <View>
      <ScrollView>
        <TableView>
          <Section>
            {menus[title].map(menu => (
              <Cell key={menu.title} title={menu.title} />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cellContentView: {

    borderBottomColor: "#ccc",
    backgroundColor: "none",
    width: "100%",
  },
  cellImageView: {
    width: "100%",
    height: 290,
    justifyContent: "center",
    alignItems: "center",
  },
  cellImage: {
    width: "100%",
    height: "100%",
  },
  cellTextView: {
    padding: 10,
    width: "100%",
  },
  cellTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cellTagline: {
    fontSize: 14,
    color: "#666",
  },
  cellEta: {
    position: "absolute",
    right: 10,
    top: -30,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    borderRadius: 100000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  cellEtaText: {
    fontSize: 14,
    textAlign: "center",
  }
});
