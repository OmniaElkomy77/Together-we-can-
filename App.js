
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Tts from 'react-native-tts';
import Auth_access from "./component/Auth/Auth_access"
import Home_page from "./component/Home/Home_page"
import Main_layout from "./component/Home/Main_layout"
import Courses_list from "./component/Home/Courses_list"
import Course_details from "./component/Home/Course_details"
import Login from "./component/Auth/Login"
import Sign_up from "./component/Auth/Sign_up"
import SwitchControls from "./component/SwitchControls"
import personal_page from "./component/Home/personal_page"
import Exams from "./component/Home/Exams"
import Voice from './component/Home/Voice';
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
const Auth = createStackNavigator({
  Auth_access: Auth_access,
  Login: Login,
  Sign_up: Sign_up
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  {

    initialRouteName: Auth_access,

  })
const HomePages = createStackNavigator(
  {

    Home_page: Home_page,
    Main_layout: Main_layout,
    Courses_list: Courses_list,
    Course_details: Course_details,
    personal_page: personal_page,
    Exams: Exams,
    Voice: Voice

  }
  , {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  },
  {
    initialRouteName: Home_page
  }
)
const AppSwitch = createSwitchNavigator({
  SwitchControls: { screen: SwitchControls },
})
const All = createSwitchNavigator(
  {
    AppSwitch: AppSwitch,
    Auth: Auth,
    HomePages: HomePages,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
)
const App = createAppContainer(All)

export default App

// export default class App extends React.Component {
//   // constructor() {
//   //   super()
//   //   this.state = {
//   //     text_voice: "hello world"
//   //   }
//   // }
//   // handle_voice() {
//   //   Tts.speak(this.state.text_voice);
//   //   Tts.voices().then(voices => console.log(voices));
//   //   Tts.setDefaultLanguage('en-IE');
//   // }
//   render() {

//     return (
//       <>
//         <Courses_list />

//       </>
//       // <View style={{ justifyContent: "center", height: "100%" }}>
//       //   <TouchableOpacity
//       //     onPress={() => {
//       //       this.handle_voice()




//       //     }}


//       //     style={{
//       //       height: 100,
//       //       width: 200,
//       //       backgroundColor: "#141",
//       //       alignSelf: "center", borderRadius: 10,
//       //       alignItems: "center",
//       //       justifyContent: "center"
//       //     }}>
//       //     <Text style={{ color: "#fff" }}>hello world</Text>
//       //   </TouchableOpacity>
//       // </View>

//     )
//   }
// };
