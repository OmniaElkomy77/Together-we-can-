import React from "react"
import { View, Text, TouchableOpacity, Image, StatusBar, TextInput } from "react-native"
import { App_Colors, App_Size } from "../../constants/Theme"
import Images from "../../constants/Images"
import Icon from "react-native-vector-icons/FontAwesome5"
export default class Auth_access extends React.Component {
    render() {
        return (
            // <>
            //     <StatusBar backgroundColor={App_Colors.white} />
            //     <View style={{ height: '100%', width: "100%", backgroundColor: App_Colors.white }}>

            //         <View style={{
            //             height: 100, width: "100%", alignItems: "center",
            //             justifyContent: "flex-end"
            //         }}>
            //             <Text style={{ textDecorationLine: "underline", fontSize: 20, color: App_Colors.primary }}> صفحه تسجيل الدخول </Text>
            //         </View>


            //         <View style={{
            //             height: App_Size.height / 4,
            //             width: "100%",
            //             // backgroundColor: "#747",
            //             alignItems: "center",
            //             justifyContent: "center"
            //         }}>
            //             <Text style={{
            //                 color: App_Colors.black,
            //                 fontSize: 30, fontWeight: "bold"
            //             }}> مع بعض نقدر</Text>
            //         </View>



            //         <View style={{
            //             // backgroundColor: "#781",
            //             alignItems: "center",
            //             // justifyContent: "space-around"
            //         }}>
            //             <TextInput style={{
            //                 // height: 70,
            //                 padding: 15,
            //                 width: "90%",
            //                 borderRadius: 10,
            //                 borderColor: App_Colors.primary,
            //                 borderWidth: 2, marginVertical: 15

            //             }}


            //                 placeholder="الاسم الاول"
            //                 placeholderTextColor={App_Colors.gray}
            //             />

            //             <TextInput style={{
            //                 // height: 70,
            //                 padding: 15,
            //                 width: "90%",
            //                 borderRadius: 10,
            //                 borderColor: App_Colors.primary,
            //                 borderWidth: 2, marginVertical: 15

            //             }}


            //                 placeholder="الاسم الاخير"
            //                 placeholderTextColor={App_Colors.gray}
            //             />

            //             <TextInput style={{
            //                 // height: 70,
            //                 padding: 15,
            //                 width: "90%",
            //                 borderRadius: 10,
            //                 borderColor: App_Colors.primary,
            //                 borderWidth: 2, marginVertical: 15

            //             }}


            //                 placeholder=" البريد الالكتروني "
            //                 placeholderTextColor={App_Colors.gray}
            //             />

            //             <View style={{
            //                 flexDirection: "row",
            //                 // justifyContent: "center",
            //                 width: '90%',
            //                 borderRadius: 10,
            //                 borderColor: App_Colors.primary,
            //                 borderWidth: 2,
            //                 marginVertical: 15,
            //                 alignItems: "center"

            //             }}>
            //                 <TextInput style={{
            //                     // height: 70,
            //                     padding: 15,
            //                     width: "90%",
            //                     // backgroundColor: "#474"


            //                 }}


            //                     placeholder="كلمه السر"
            //                     placeholderTextColor={App_Colors.gray}
            //                 />
            //                 <TouchableOpacity>
            //                     <Icon name="eye-slash" size={20} />
            //                 </TouchableOpacity>
            //             </View>

            //             <TouchableOpacity style={{
            //                 backgroundColor: App_Colors.primary, height: 70,
            //                 width: 300,
            //                 marginVertical: 10,
            //                 borderRadius: 5,
            //                 alignItems: "center",
            //                 justifyContent: "center"
            //             }}>
            //                 <Text style={{
            //                     fontSize: 25,
            //                     fontWeight: "bold",
            //                     color: App_Colors.white
            //                 }}>
            //                     ابدء
            //                 </Text>

            //             </TouchableOpacity>
            //         </View>






            //     </View>

            // </>


            // Design2
            // <>
            //     <StatusBar backgroundColor={App_Colors.white} />
            //     <View style={{ height: '100%', width: "100%", backgroundColor: App_Colors.white }}>

            //         <View style={{
            //             height: 100, width: "100%", alignItems: "center",
            //             justifyContent: "flex-end"
            //         }}>
            //             <Text style={{ textDecorationLine: "underline", fontSize: 20, color: App_Colors.primary }}> صفحه تسجيل الدخول </Text>
            //         </View>


            //         <View style={{
            //             height: App_Size.height / 4,
            //             width: "100%",
            //             // backgroundColor: "#747",
            //             alignItems: "center",
            //             justifyContent: "center"
            //         }}>
            //             <Text style={{
            //                 color: App_Colors.black,
            //                 fontSize: 30, fontWeight: "bold"
            //             }}> مع بعض نقدر</Text>
            //         </View>



            //         <View style={{
            //             // backgroundColor: "#781",
            //             alignItems: "center",
            //             // justifyContent: "space-around"
            //         }}>
            //             <TextInput style={{
            //                 // height: 70,
            //                 padding: 15,
            //                 width: "90%",
            //                 borderRadius: 10,
            //                 borderColor: App_Colors.primary,
            //                 borderWidth: 2, marginVertical: 15

            //             }}


            //                 placeholder=" البريد الالكتروني "
            //                 placeholderTextColor={App_Colors.gray}
            //             />

            //             <View style={{
            //                 flexDirection: "row",
            //                 // justifyContent: "center",
            //                 width: '90%',
            //                 borderRadius: 10,
            //                 borderColor: App_Colors.primary,
            //                 borderWidth: 2,
            //                 marginVertical: 15,
            //                 alignItems: "center"

            //             }}>
            //                 <TextInput style={{
            //                     // height: 70,
            //                     padding: 15,
            //                     width: "90%",
            //                     // backgroundColor: "#474"


            //                 }}


            //                     placeholder="كلمه السر"
            //                     placeholderTextColor={App_Colors.gray}
            //                 />
            //                 <TouchableOpacity>
            //                     <Icon name="eye-slash" size={20} />
            //                 </TouchableOpacity>
            //             </View>

            //             <TouchableOpacity style={{
            //                 backgroundColor: App_Colors.primary, height: 70,
            //                 width: 300,
            //                 marginVertical: 10,
            //                 borderRadius: 5,
            //                 alignItems: "center",
            //                 justifyContent: "center"
            //             }}>
            //                 <Text style={{
            //                     fontSize: 25,
            //                     fontWeight: "bold",
            //                     color: App_Colors.white
            //                 }}>
            //                     ابدء
            //                 </Text>

            //             </TouchableOpacity>
            //         </View>






            //     </View>

            // </>








            // design1



            <View style={{ height: '100%', width: "100%", backgroundColor: App_Colors.white }}>
                <StatusBar backgroundColor={App_Colors.white} barStyle={"dark-content"} />
                <Image source={Images.Images.hands}
                    style={{ height: "50%", width: '100%' }}
                />
                <View style={{ height: App_Size.height / 2, width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity

                        onPress={() => {
                            this.props.navigation.navigate("Login")
                        }}

                        style={{
                            height: 70,
                            width: 300, borderRadius: 10, backgroundColor: App_Colors.primary,
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 10
                        }}>
                        <Text style={{
                            color: App_Colors.white,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>تسجيل الدخول</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Sign_up")

                        }}

                        style={{
                            height: 70,
                            width: 300, borderRadius: 10, backgroundColor: App_Colors.white,
                            borderColor: App_Colors.primary,
                            borderWidth: 2,
                            marginVertical: 10,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Text style={{
                            color: App_Colors.primary,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}> انشاء حساب</Text>
                    </TouchableOpacity>



                </View>
            </View>
        )
    }
}