import React from "react"
import { View, Text, StatusBar, Image, ToastAndroid, FlatList, ActivityIndicator } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { App_Colors } from "../../constants/Theme"
import { TouchableOpacity } from "react-native"
import Images from "../../constants/Images"
// import { ScrollView } from "react-native-gesture-handler"
import axios from "axios"

export default class Course_details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lesson_name: this.props.navigation.getParam("lesson_name"),
            lesson_id: this.props.navigation.getParam("lesson_id"),
            data: [],
            sound: [],
            loading: false

        }
    }
    componentDidMount() {
        this.get_content()
    }

    get_content() {
        let data_to_send = {
            lesson_id: this.state.lesson_id
        }
        this.setState({ loading: true })
        axios.post("https://elearning0103.000webhostapp.com/select_lesson_content.php", data_to_send).then(res => {
            console.log(JSON.stringify(res.data.massage.txt))
            if (res.data.status == "success") {

                this.setState({
                    data: res.data.massage.txt,
                    sound: res.data.massage.sound,
                    loading: false
                })
                // console.log(res.data.massage.sound)
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    "حدث خطأ ما ",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
            }
        }

        )
    }


    render() {
        return (
            <>
                <StatusBar backgroundColor={"#222"} />
                <View style={{ flex: 1, backgroundColor: "#000" }}>
                    {/* <ScrollView> */}
                    <View style={{
                        height: 70,
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%", backgroundColor: "#222",
                        flexDirection: "row", padding: 20
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("Main_layout")
                        }}>
                            <Icon name="bars" size={30} color={App_Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}

                        >
                            <Icon name="angle-left" size={30} color={App_Colors.white} />
                        </TouchableOpacity>
                    </View>




                    <View style={{
                        alignSelf: "center",
                        width: "70%",
                        borderBottomColor: App_Colors.white,
                        borderBottomWidth: 3,
                        padding: 15
                    }}>
                        <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", color: App_Colors.white }}>
                            {this.state.lesson_name}
                        </Text>

                    </View>


                    {this.state.loading ?
                        <View style={{ height: "70%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size={25} color={App_Colors.primary} />
                        </View>
                        :
                        <View style={{ marginVertical: 10, padding: 7, }}>

                            <FlatList
                                data={this.state.data}
                                keyExtractor={(_, index) => `txt-${index.toString()}`}
                                renderItem={({ index, item }) => (
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: "800",
                                        color: App_Colors.white,
                                        textAlign: "auto"
                                    }}>
                                        {item.lesson_content_value}
                                    </Text>
                                )}
                                ListEmptyComponent={() => {
                                    <View style={{ height: "70%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 20, color: App_Colors.white }}>لا يوجد اي بيانات </Text>
                                    </View>
                                }}

                            />

                        </View>


                    }

                    {this.state.loading == false && this.state.data.length > 0 ?
                        <View style={{
                            width: "95%",
                            flexDirection: "row", justifyContent: "space-around",
                            alignItems: "center",
                            // backgroundColor: "#014",
                            alignSelf: "center"
                        }}>

                            <TouchableOpacity

                                onPress={() => {
                                    this.props.navigation.navigate("Exams",
                                        { lesson_id: this.state.lesson_id })
                                }}

                                style={{
                                    height: 70,
                                    width: 150,
                                    backgroundColor: App_Colors.primary,
                                    // alignSelf: "center",
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Text style={{ color: App_Colors.white, fontSize: 20, fontWeight: "bold" }}>
                                    الاسئله
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity

                                onPress={() => {
                                    this.props.navigation.navigate("Voice",
                                        {
                                            sound: this.state.sound
                                        })
                                    // console.log(this.state.sound)
                                }}

                                style={{
                                    height: 70,
                                    width: 150,
                                    backgroundColor: App_Colors.primary,
                                    // alignSelf: "center",
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Text style={{ color: App_Colors.white, fontSize: 20, fontWeight: "bold" }}>
                                    الشرح بصوت
                                </Text>

                            </TouchableOpacity>


                        </View>
                        : null
                    }

                    {/* </ScrollView> */}
                </View>


            </>
        )
    }
}