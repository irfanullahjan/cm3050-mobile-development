import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Settings } from "../screens/Settings";
import { User } from "../screens/User";
import { StackNavigation } from "./StackNavigation";
import { TabBar } from "./TabBar";

export function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const { user } = useContext(AppContext);

  if (!user) {
    return <StackNavigation />;
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={StackNavigation} />
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
