import React from "react"
import { View, Text, TouchableOpacity, Image, StatusBar, TextInput, ToastAndroid, ScrollView, ActivityIndicator } from "react-native"
import { App_Colors, App_Size } from "../../constants/Theme"
import Images from "../../constants/Images"
import Icon from "react-native-vector-icons/FontAwesome5"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Domain from "../../constants/Api"
export default class Auth_access extends React.Component {
    constructor() {
        super()
        this.state = {
            showpass: false,
            password: "",
            email: "",
            showborder_password: false,
            showborder_email: false,
            text_email_warn: "",
            text_pass_warn: "",
            loading: false
        }
    }

    validate_email(text) {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

        if (reg.test(text) === false && text.length > 0) {
            this.setState({ email: text })
            this.setState({ showborder_email: true })
            return false
        } else {
            this.setState({ email: text })
            this.setState({ text_email_warn: " ", showborder_email: false })

            return true
        }


    };

    check_password(value) {
        if (value.length <= 5 && value.length > 0) {
            this.setState({ showborder_password: true })
        } else {
            this.setState({ text_pass_warn: "", showborder_password: false })
        }
    }

    async logIn_fun() {
        let error = 0
        if (this.state.email == "") {
            this.setState({ text_email_warn: " يجب عليك ادخال البريد الإلكتروني" })
            error++
        }

        if (this.state.password == "") {
            this.setState({ text_pass_warn: " يجب عليك ادخال كلمه السر " })
            error++
        }
        if (this.state.password.length <= 5) {

            error++
            if (!(this.validate_email(this.state.email))) {
                error++
            }

            if (error == 1 && this.state.password.length <= 5) {
                this.setState({ text_pass_warn: " يجب ان تكون كلمه السر من 6 احرف او اكثر " })
                this.setState({ text_email_warn: "" })
            } else if (error == 1 && !(this.validate_email(this.state.email))) {
                this.setState({ text_email_warn: " يجب عليك ادخال بريد الكتروني صحيح" })
                this.setState({ text_pass_warn: "" })
            } else {
                this.setState({ text_pass_warn: " يجب ان تكون كلمه السر من 6 احرف او اكثر " })
                this.setState({ text_email_warn: " يجب عليك ادخال بريد الكتروني صحيح" })
            }

        } else {
            // this.props.navigation.navigate("Home_page")
            this.setState({ text_pass_warn: "" })
            this.setState({ text_email_warn: "" })


            let data_to_send = {
                email: this.state.email,
                password: this.state.password
            }
            this.setState({ loading: true })
            axios.post("https://elearning0103.000webhostapp.com/sign_in.php", data_to_send).then(res => {
                // console.log(res.data)
                if (res.data.status == "success") {
                    this.set_data(res.data.massage)
                    this.setState({ loading: false })
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        "حدث خطأ ما ",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                }
            })

            // let data_to_send = {
            //     email: this.state.email,
            //     password: this.state.password
            // };

            // let users = await AsyncStorage.getItem("users")

            // if (!users) {
            //     users = []
            // } else {
            //     users = JSON.parse(users)
            // }

            // let found = -1;

            // for (let i = 0; i < users.length; i++) {

            //     if (data_to_send.email == users[i].email && data_to_send.password == users[i].password) {

            //         found = i;
            //         let obj = {
            //             f_name: users[i].f_name,
            //             l_name: users[i].l_name,
            //             email: users[i].email
            //         }
            //         await AsyncStorage.setItem("obj", JSON.stringify(obj))
            //         break;
            //     }
            // }

            // if (found == -1) {

            //     ToastAndroid.showWithGravityAndOffset(
            //         "بيانات المستخدم غير صحيحه",
            //         ToastAndroid.SHORT,
            //         ToastAndroid.BOTTOM,
            //         20,
            //         20
            //     );

            // }
            // else {
            //     await AsyncStorage.setItem('switch', 'Home');
            //     this.props.navigation.navigate('HomePages');


            //     // console.log("111")
            // }














        }
    }

    async set_data(data) {
        await AsyncStorage.setItem("courses_data", JSON.stringify(data))
        await AsyncStorage.setItem('switch', 'Home');
        this.props.navigation.navigate('HomePages');
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.white} />
                <View style={{ height: '100%', width: "100%", backgroundColor: App_Colors.white }}>
                    <ScrollView>
                        <View style={{
                            height: 100, width: "100%", alignItems: "center",
                            justifyContent: "flex-end"
                        }}>
                            <Text style={{ textDecorationLine: "underline", fontSize: 20, color: App_Colors.primary }}> صفحه تسجيل الدخول </Text>
                        </View>


                        <View style={{
                            height: App_Size.height / 4,
                            width: "100%",
                            // backgroundColor: "#747",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                color: App_Colors.black,
                                fontSize: 30, fontWeight: "bold"
                            }}> مع بعض نقدر</Text>
                        </View>



                        <View style={{
                            // backgroundColor: "#781",
                            alignItems: "center",
                            // justifyContent: "space-around"
                        }}>
                            <TextInput style={{
                                // height: 70,
                                padding: 15,
                                width: "90%",
                                borderRadius: 10,
                                borderColor: this.state.showborder_email ? "#f00" : App_Colors.primary,
                                borderWidth: 2, marginVertical: 15

                            }}


                                placeholder=" البريد الالكتروني "
                                placeholderTextColor={App_Colors.gray}
                                value={this.state.email}
                                onChangeText={(value) => {

                                    this.validate_email(value)
                                }}
                                keyboardType="email-address"
                            />
                            {this.state.text_email_warn == "" ? null :
                                <Text style={{ color: "#f00", fontSize: 18, textAlign: "center" }}>
                                    {this.state.text_email_warn}
                                </Text>

                            }
                            <View style={{
                                flexDirection: "row",
                                // justifyContent: "center",
                                width: '90%',
                                borderRadius: 10,
                                borderColor: this.state.showborder_password ? "#f00" : App_Colors.primary,
                                borderWidth: 2,
                                marginVertical: 15,
                                alignItems: "center"

                            }}>
                                <TextInput style={{
                                    // height: 70,
                                    padding: 15,
                                    width: "90%",
                                    // backgroundColor: "#474"


                                }}
                                    placeholder="كلمه السر"
                                    placeholderTextColor={App_Colors.gray}
                                    secureTextEntry={this.state.showpass ? false : true}
                                    value={this.state.password}
                                    onChangeText={(value) => {
                                        this.setState({ password: value })
                                        this.check_password(value)
                                    }}
                                />
                                {this.state.showpass == false ? (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ showpass: true })
                                    }}>
                                        <Icon name="eye-slash" size={20} />
                                    </TouchableOpacity>
                                ) :
                                    (
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ showpass: false })
                                        }}>
                                            <Icon name="eye" size={20} />
                                        </TouchableOpacity>
                                    )

                                }


                            </View>
                            {this.state.text_pass_warn == "" ? null :
                                <Text style={{ color: "#f00", fontSize: 18, textAlign: "center" }}>
                                    {this.state.text_pass_warn}
                                </Text>

                            }

                            <TouchableOpacity
                                onPress={() => {
                                    this.logIn_fun()
                                }}

                                style={{
                                    backgroundColor: App_Colors.primary, height: 70,
                                    width: 300,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                {this.state.loading ?
                                    <ActivityIndicator size={20} color={App_Colors.white} />
                                    :
                                    <Text style={{
                                        fontSize: 25,
                                        fontWeight: "bold",
                                        color: App_Colors.white
                                    }}>
                                        ابدء
                                    </Text>
                                }
                            </TouchableOpacity>
                        </View>



                    </ScrollView>


                </View>

            </>
        )
    }
}