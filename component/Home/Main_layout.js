import React from "react"
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { App_Colors, App_Size } from "../../constants/Theme"
import Images from "../../constants/Images"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default class Main_layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        let courses_data = JSON.parse(await AsyncStorage.getItem("courses_data"))
        this.setState({ user: courses_data })
        // console.log(courses_data)
    }

    async logOut() {
        await AsyncStorage.setItem('switch', 'Auth');
        this.props.navigation.navigate('Auth');
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor={"#222"} />
                <View style={{ flex: 1, backgroundColor: "#222" }}>
                    <View style={{
                        height: 120,
                        width: "90%",
                        borderBottomWidth: 3,
                        borderBottomColor: "#fff",
                        alignSelf: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <View style={{
                            height: 90, width: 90, borderRadius: 10, backgroundColor: App_Colors.primary,
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <Image source={Images.Images.together}
                                style={{ height: 50, width: 50, resizeMode: "center" }}
                            />
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: App_Colors.black }}> مع بعض نقدر</Text>

                        </View>

                        <Text style={{
                            color: App_Colors.white,
                            fontSize: 20, fontWeight: "bold",
                            width: "80%",
                            // backgroundColor: "#010",

                            textAlign: "center"
                        }}>{this.state.user.f_name + " " + this.state.user.l_name}</Text>
                    </View>
                    <View style={{
                        width: "90%",
                        borderBottomColor: "#fff", borderBottomWidth: 3,
                        alignSelf: "center",
                        height: App_Size.height / 3
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("Home_page")
                            }} style={{
                                height: 80,
                                width: "95%",
                                // backgroundColor: "#414",
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: 'center',
                                flexDirection: "row"
                            }}>
                            <View style={{ width: "20%", alignItems: "center" }}>
                                <Icon name="home" size={30} color={"#fff"} />
                            </View>
                            <Text style={{
                                color: App_Colors.white,
                                width: "80%", fontSize: 20, fontWeight: "bold"
                            }}> الرئيسيه</Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("personal_page")
                            }}
                            style={{
                                height: 80,
                                width: "95%",
                                // backgroundColor: "#414",
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: 'center',
                                flexDirection: "row"
                            }}>
                            <View style={{ width: "20%", alignItems: "center" }}>
                                <Icon name="user-circle" size={30} color={"#fff"} />
                            </View>
                            <Text style={{
                                color: App_Colors.white,
                                width: "80%", fontSize: 20, fontWeight: "bold"
                            }}> الصفحه  الشخصيه</Text>

                        </TouchableOpacity>


                        {/* <TouchableOpacity style={{
                            height: 80,
                            width: "95%",
                            // backgroundColor: "#414",
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: 'center',
                            flexDirection: "row"
                        }}>
                            <View style={{ width: "20%", alignItems: "center" }}>
                                <Icon name="cog" size={30} color={"#fff"} />
                            </View>
                            <Text style={{
                                color: App_Colors.white,
                                width: "80%", fontSize: 20, fontWeight: "bold"
                            }}>الإعدادات</Text>

                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => {
                                this.logOut()

                            }}

                            style={{
                                height: 80,
                                width: "95%",
                                // backgroundColor: "#414",
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: 'center',
                                flexDirection: "row"
                            }}>
                            <View style={{ width: "20%", alignItems: "center" }}>
                                <Icon name="share" size={30} color={"#fff"} />
                            </View>
                            <Text style={{
                                color: App_Colors.white,
                                width: "80%", fontSize: 20, fontWeight: "bold"
                            }}> تسجيل الخروج</Text>

                        </TouchableOpacity>


                    </View>


                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack()


                        }}
                        style={{
                            backgroundColor: App_Colors.primary, height: 70,
                            width: 180,
                            borderRadius: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            marginVertical: 40
                        }}
                    >
                        <Text style={{
                            color: "#fff", fontSize: 20,
                            fontWeight: "bold"
                        }}> العوده </Text>
                    </TouchableOpacity>

                </View>

            </>
        )
    }
}