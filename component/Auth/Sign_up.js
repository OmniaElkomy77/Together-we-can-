import React from "react"
import {
    View, Text, TouchableOpacity, Image, StatusBar, TextInput,
    ScrollView, ToastAndroid, ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../../constants/Theme"
import Images from "../../constants/Images"
import Icon from "react-native-vector-icons/FontAwesome5"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Domain from "../../constants/Api"
export default class Auth_access extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            f_name: "",
            l_name: "",
            email_sign_up: "",
            pass_sign_up: "",
            show_f_name_border: false,
            show_l_name_border: false,
            showborder_email_sign_up: false,
            show_pass_border: false,
            icon_security: true,
            f_name_warn: "",
            l_name_warn: "",
            email_warn: "",
            users: [],
            loading: false

        }

    }


    check_first_name(value) {
        if (value.length <= 3 && value.length > 0) {
            this.setState({ show_f_name_border: true })
        } else {
            this.setState({ f_name_warn: "", show_f_name_border: false })

        }
    }
    check_last_name(value) {
        if (value.length <= 3 && value.length > 0) {
            this.setState({ show_l_name_border: true })
        } else {
            this.setState({ l_name_warn: "", show_l_name_border: false })
        }
    }


    validate_email(text) {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

        if (reg.test(text) === false && text.length > 0) {
            this.setState({ email_sign_up: text })
            this.setState({ showborder_email_sign_up: true })
            return false
        } else if (reg.test(text) === true && text.length > 0) {
            this.setState({ email_sign_up: text })
            this.setState({ email_warn: "", showborder_email_sign_up: false })
            return true
        } else {
            return false
        }

    }



    check_pass_sign_up(value) {
        if (value.length <= 5 && value.length > 0) {
            this.setState({ show_pass_border: true })
        } else {
            this.setState({ pass_warn: "", show_pass_border: false })
        }
    }

    async signUp_fun() {
        let error = 0
        if (this.state.f_name == "") {
            this.setState({ f_name_warn: "يجب عليك ادخال الاسم الاول", show_f_name_border: true })
            error++
        }

        if (this.state.l_name == "") {
            this.setState({ l_name_warn: "يجب عليك ادخال الاسم الاخير ", show_l_name_border: true })
            error++
        }
        if (this.state.email_sign_up == "") {
            this.setState({ email_warn: "يجب عليك ادخال  بريد الكتروني " })
            this.setState({ showborder_email_sign_up: true })
            error++

        }
        if (this.state.pass_sign_up == "") {
            this.setState({ pass_warn: " يجب عليك ادخال كلمه السر ", show_pass_border: true })
            error++

        }

        if (this.state.f_name.length < 3) {
            this.setState({ f_name_warn: " يجب ان يتكون الاسم الاول من 3 حروف او اكثر ", show_f_name_border: true })
            error++
        } else {
            this.setState({ f_name_warn: "", show_f_name_border: false })
        }

        if (this.state.l_name.length < 3) {
            this.setState({ l_name_warn: "يجب  ان يتكون الاسم الاخير من 3 حروف او اكثر ", show_l_name_border: true })
            error++
        }
        if (!(this.validate_email(this.state.email_sign_up))) {
            this.setState({ email_warn: "يجب عليك ادخال  بريد الكتروني صحيح", showborder_email_sign_up: true })
            error++
        }
        if (this.state.pass_sign_up.length <= 5) {
            this.setState({ pass_warn: " يجب ان تتكون كلمه السر من 6 احرف ا اكثر ", show_pass_border: true })
            error++
        }
        if (error == 0) {

            let data_to_send = {
                f_name: this.state.f_name,
                l_name: this.state.l_name,
                email: this.state.email_sign_up,
                password: this.state.pass_sign_up
            }
            this.setState({ loading: true })
            // console.log(JSON.stringify(data_to_send))
            axios.post("https://elearning0103.000webhostapp.com/sign_up.php", data_to_send).then(
                res => {
                    // console.log(res.data.massage)
                    if (res.data.status == "success") {

                        this.set_data()
                        this.setState({ loading: false })

                    } else if (res.massage == "تمت الاضافه من قبل") {
                        ToastAndroid.showWithGravityAndOffset(
                            "تم الاضافه من قبل",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    }
                    else {

                        ToastAndroid.showWithGravityAndOffset(
                            "حدث خطأ ما ",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    }
                }



            );


        }
        //     let data_to_send = {
        //         f_name: this.state.f_name,
        //         l_name: this.state.l_name,
        //         email: this.state.email_sign_up,
        //         password: this.state.pass_sign_up,

        //     };

        //     let users = await AsyncStorage.getItem('users');

        //     if (!users) {
        //         users = [];
        //     } else {
        //         users = JSON.parse(users);
        //     }

        //     let found = 0;

        //     for (let i = 0; i < users.length; i++) {
        //         if (data_to_send.email == users[i].email) {
        //             found = 1;
        //             break;
        //         }
        //     }

        //     if (found == 0) {
        //         users.push(data_to_send);

        //         await AsyncStorage.setItem('users', JSON.stringify(users));
        //         this.props.navigation.navigate("Login")


        //     } else {

        //         ToastAndroid.showWithGravityAndOffset(
        //             "هــــذا البـــريد الالكتــروني موجــود بالفعــل",
        //             ToastAndroid.SHORT,
        //             ToastAndroid.BOTTOM,
        //             20,
        //             20
        //         );
        //     }


        // }


    }
    async set_data() {

        await AsyncStorage.setItem('switch', 'Auth');
        this.props.navigation.navigate('Login');
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
                            <Text style={{ textDecorationLine: "underline", fontSize: 20, color: App_Colors.primary }}> صفحه  انشاء حساب</Text>
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
                                borderColor: this.state.show_f_name_border ? "#f00" : App_Colors.primary,
                                borderWidth: 2, marginVertical: 15

                            }}


                                placeholder="الاسم الاول"
                                placeholderTextColor={App_Colors.gray}
                                value={this.state.f_name}
                                onChangeText={(value) => {
                                    this.check_first_name(value)
                                    this.setState({ f_name: value })
                                }}
                            />
                            {this.state.f_name_warn == "" ? null :
                                <Text style={{ color: App_Colors.red, fontSize: 18 }}>
                                    {this.state.f_name_warn}
                                </Text>
                            }
                            <TextInput style={{
                                // height: 70,
                                padding: 15,
                                width: "90%",
                                borderRadius: 10,
                                borderColor: this.state.show_l_name_border ? "#f00" : App_Colors.primary,
                                borderWidth: 2, marginVertical: 15

                            }}


                                placeholder="الاسم الاخير"
                                placeholderTextColor={App_Colors.gray}
                                value={this.state.l_name}
                                onChangeText={(value) => {
                                    this.check_last_name(value)
                                    this.setState({ l_name: value })
                                }}
                            />

                            {this.state.l_name_warn == "" ? null :
                                <Text style={{ color: App_Colors.red, fontSize: 18 }}>
                                    {this.state.l_name_warn}
                                </Text>
                            }

                            <TextInput style={{
                                // height: 70,
                                padding: 15,
                                width: "90%",
                                borderRadius: 10,
                                borderColor: this.state.showborder_email_sign_up ? "#f00" : App_Colors.primary,
                                borderWidth: 2, marginVertical: 15

                            }}


                                placeholder=" البريد الالكتروني "
                                placeholderTextColor={App_Colors.gray}
                                value={this.state.email_sign_up}
                                onChangeText={(value) => {
                                    this.setState({ email_sign_up: value })
                                    this.validate_email(value)
                                }}
                            />

                            {this.state.email_warn == "" ? null :
                                <Text style={{ color: App_Colors.red, fontSize: 18 }}>
                                    {this.state.email_warn}
                                </Text>
                            }
                            <View style={{
                                flexDirection: "row",
                                // justifyContent: "center",
                                width: '90%',
                                borderRadius: 10,
                                borderColor: this.state.show_pass_border ? "#f00" : App_Colors.primary,
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
                                    value={this.state.pass_sign_up}
                                    onChangeText={(value) => {
                                        this.setState({ pass_sign_up: value })
                                        this.check_pass_sign_up(value)

                                    }}
                                    secureTextEntry={this.state.icon_security ? true : false}
                                />

                                {this.state.icon_security ?
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ icon_security: false })
                                    }}>
                                        <Icon name="eye-slash" size={20} color={App_Colors.gray} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ icon_security: true })
                                    }}>
                                        <Icon name="eye" size={20} color={App_Colors.gray} />
                                    </TouchableOpacity>
                                }




                            </View>
                            {this.state.pass_warn == "" ? null :
                                <Text style={{ color: App_Colors.red, fontSize: 18 }}>
                                    {this.state.pass_warn}
                                </Text>
                            }

                            <TouchableOpacity
                                onPress={() => {

                                    this.signUp_fun()
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