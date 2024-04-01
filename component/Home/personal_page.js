import React from "react";
import { Image, ToastAndroid } from "react-native";
import { View, Text, TouchableOpacity, StatusBar, Modal, TouchableWithoutFeedback, TextInput } from "react-native"
import Images from "../../constants/Images";
import { App_Size, App_Colors } from "../../constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class personal_page extends React.Component {
    constructor() {
        super()
        this.state = {
            obj: {},
            modal_edit_name: false,
            f_name: "",
            l_name: "",
            modal_edit_email: false,
            email: ""
        }
    }
    async componentDidMount() {
        let data = JSON.parse(await AsyncStorage.getItem("courses_data"))
        // console.log(data)
        this.setState({ obj: data })

    }
    async componentDidUpdate() {
        let data = JSON.parse(await AsyncStorage.getItem("courses_data"))
        // console.log(data)
        this.setState({ obj: data })
    }


    async Edit_name() {
        this.setState({ modal_edit_name: false })
        let users = JSON.parse(await AsyncStorage.getItem("users"))
        let data = JSON.parse(await AsyncStorage.getItem("courses_data"))
        let f_name = this.state.f_name
        let l_name = this.state.l_name
        if (f_name.length == 0 || l_name.length == 0) {
            ToastAndroid.showWithGravityAndOffset(
                "يجب عليك ادخال بيانات اولاٌ",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
        } else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].f_name == data.f_name && users[i].l_name == data.l_name) {
                    users[i].f_name = f_name
                    users[i].l_name = l_name
                    break;
                }
            }
            let obj = {
                f_name: f_name,
                l_name: l_name,
                email: data.email
            }
            await AsyncStorage.setItem("courses_data", JSON.stringify(obj))
            await AsyncStorage.setItem("users", JSON.stringify(users))
            this.componentDidUpdate()
            this.setState({ f_name: "", l_name: "" })


        }

    }

    validate_email(text) {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

        if (reg.test(text) === false && text.length > 0) {
            this.setState({ email: text })

            return false
        } else {
            this.setState({ email: text })


            return true
        }


    };


    async Edit_email() {
        this.setState({ modal_edit_email: false })
        let users = JSON.parse(await AsyncStorage.getItem("users"))
        let data = JSON.parse(await AsyncStorage.getItem("courses_data"))
        let email = this.state.email

        if (!(this.validate_email(email))) {
            ToastAndroid.showWithGravityAndOffset(
                "يجب عليك ادخال بيانات صحيحه",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
        } else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == data.email) {
                    users[i].email = email

                    break;
                }
            }
            let obj = {
                f_name: data.f_name,
                l_name: data.l_name,
                email: email
            }
            await AsyncStorage.setItem("courses_data", JSON.stringify(obj))
            await AsyncStorage.setItem("users", JSON.stringify(users))
            this.componentDidUpdate()
            this.setState({ email: "" })



        }

    }

    render() {
        return (
            <>
                <StatusBar backgroundColor={"#222"}
                    barStyle={"light-content"} />
                <View style={{ height: "100%", width: "100%", backgroundColor: "#000" }}>
                    <View style={{
                        height: 70,
                        width: "100%", justifyContent: "center", alignItems: "center",
                        backgroundColor: "#222"
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>الصفحه الشخصيه</Text>
                    </View>


                    <View
                        // onPress={() => {
                        //     this.setState({ modal_edit_name: true })
                        // }}

                        style={{
                            height: 100,
                            width: "100%",
                            backgroundColor: "#222", marginVertical: 15,
                            flexDirection: "row",
                            // justifyContent: "space-around",
                            alignItems: "center"
                        }}>
                        <Image source={Images.Images.user} style={{
                            height: 70, width: 100,
                            resizeMode: "center",
                        }} />
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{this.state.obj.f_name + " " + this.state.obj.l_name}</Text>

                    </View>


                    <View
                        // onPress={() => {
                        //     this.setState({ modal_edit_email: true })
                        // }}

                        style={{
                            height: 100,
                            width: "100%",
                            backgroundColor: "#222", marginVertical: 15,
                            flexDirection: "row",
                            // justifyContent: "space-around",
                            alignItems: "center"
                        }}>
                        <Image source={Images.Images.email} style={{
                            height: 70, width: 100,
                            resizeMode: "center",
                        }} />
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{this.state.obj.email}</Text>

                    </View>

                </View>


                <Modal
                    visible={this.state.modal_edit_name}
                    onRequestClose={() => {
                        this.setState({ modal_edit_name: false })
                    }}
                    animationType="slide"
                    // presentationStyle="formSheet"s
                    transparent={true}>
                    <View
                        style={{
                            // opacity:0.7,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modal_edit_name: false })
                            }}>
                            <View
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <View
                            style={{
                                height: App_Size.height,
                                // width: width,
                                flex: 1,
                                // alignContent: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <View
                                style={{
                                    // height:height,
                                    alignSelf: 'center',
                                    justifyContent: 'space-around',
                                    width: '90%',
                                    backgroundColor: App_Colors.black,
                                    borderRadius: 10,
                                    elevation: 5,
                                    paddingVertical: 15,
                                    marginBottom: 10,
                                }}>

                                <View
                                    style={{
                                        // height: 50,
                                        // width: '100%',
                                        // backgroundColor: "#858",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{ color: App_Colors.white, fontWeight: 'bold', fontSize: 20 }}>
                                        تعديل بيانات الشخصيه
                                    </Text>
                                </View>


                                <View style={{
                                    // height: "40%",
                                    // backgroundColor: "#125",
                                    alignItems: 'center',
                                    justifyContent: "center"

                                }}>
                                    <TextInput style={{
                                        padding: 15,

                                        width: "95%", backgroundColor: "#222",
                                        // color: App_Colors.black,
                                        borderRadius: 10,
                                        marginTop: 20,
                                        color: App_Colors.white
                                    }}
                                        placeholder="إدخل الاسم الاول"
                                        placeholderTextColor={"#999"}
                                        value={this.state.f_name}
                                        onChangeText={(value) => {
                                            this.setState({ f_name: value })
                                        }}

                                    />


                                    <TextInput style={{
                                        padding: 15,

                                        width: "95%", backgroundColor: "#222",
                                        // color: App_Colors.black,
                                        borderRadius: 10,
                                        marginTop: 20,
                                        color: App_Colors.white

                                    }}
                                        placeholder="إدخل الاسم الاخير "
                                        placeholderTextColor={"#999"}
                                        value={this.state.l_name}
                                        onChangeText={(value) => {
                                            this.setState({ l_name: value })
                                        }}

                                    />













                                </View>
                                <View
                                    style={{
                                        height: 100,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // backgroundColor: "#eee",
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {


                                            this.Edit_name()

                                        }}
                                        style={{
                                            height: 50,
                                            width: 100,
                                            backgroundColor: App_Colors.primary,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                        }}>


                                        <Text
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                            تأكيد
                                        </Text>


                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modal_edit_name: false })
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>






                <Modal
                    visible={this.state.modal_edit_email}
                    onRequestClose={() => {
                        this.setState({ modal_edit_email: false })
                    }}
                    animationType="slide"
                    // presentationStyle="formSheet"s
                    transparent={true}>
                    <View
                        style={{
                            // opacity:0.7,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modal_edit_email: false })
                            }}>
                            <View
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <View
                            style={{
                                height: App_Size.height,
                                // width: width,
                                flex: 1,
                                // alignContent: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <View
                                style={{
                                    // height:height,
                                    alignSelf: 'center',
                                    justifyContent: 'space-around',
                                    width: '90%',
                                    backgroundColor: App_Colors.black,
                                    borderRadius: 10,
                                    elevation: 5,
                                    paddingVertical: 15,
                                    marginBottom: 10,
                                }}>

                                <View
                                    style={{
                                        // height: 50,
                                        // width: '100%',
                                        // backgroundColor: "#858",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{ color: App_Colors.white, fontWeight: 'bold', fontSize: 20 }}>
                                        تعديل بيانات الشخصيه
                                    </Text>
                                </View>


                                <View style={{
                                    // height: "40%",
                                    // backgroundColor: "#125",
                                    alignItems: 'center',
                                    justifyContent: "center"

                                }}>
                                    <TextInput style={{
                                        padding: 15,

                                        width: "95%", backgroundColor: "#222",
                                        // color: App_Colors.black,
                                        borderRadius: 10,
                                        marginTop: 20,
                                        color: App_Colors.white
                                    }}
                                        placeholder="إدخل البريد الالكتروني"
                                        placeholderTextColor={"#999"}
                                        value={this.state.email}
                                        onChangeText={(value) => {
                                            this.setState({ email: value })
                                        }}

                                    />
















                                </View>
                                <View
                                    style={{
                                        height: 100,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // backgroundColor: "#eee",
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {


                                            this.Edit_email()

                                        }}
                                        style={{
                                            height: 50,
                                            width: 100,
                                            backgroundColor: App_Colors.primary,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                        }}>


                                        <Text
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                            تأكيد
                                        </Text>


                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modal_edit_email: false })
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>









































            </>
        )
    }
}