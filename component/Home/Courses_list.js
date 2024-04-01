import React from "react"
import {
    View, Text, TouchableOpacity, Image,
    StatusBar, FlatList, ToastAndroid,
    ActivityIndicator
} from "react-native"
import { App_Colors } from "../../constants/Theme"
import Images from "../../constants/Images"
import axios from "axios"
export default class Courses_list extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            course_id: this.props.navigation.getParam("course_id"),

            Courseslist: [],
            loading: false

        }
    }
    componentDidMount() {
        // console.log(this.props.navigation.getParam("Courseslist"))
        this.get_lessons()
    }
    get_lessons() {
        let data_to_send = {
            course_id: this.state.course_id
        }
        this.setState({ loading: true })
        axios.post("https://elearning0103.000webhostapp.com/select_lessons.php", data_to_send).then(res => {
            // console.log(res.data)
            if (Array.isArray(res.data.massage)) {
                this.setState({ Courseslist: res.data.massage, loading: false })
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
    }


    render() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.black} />
                <View style={{ flex: 1, backgroundColor: "#222" }}>
                    {this.state.loading ?
                        <View style={{
                            height: "100%",
                            width: "100%", alignItems: "center", justifyContent: "center"
                        }}>
                            <ActivityIndicator size={30} color={App_Colors.primary} />
                        </View>

                        :
                        <FlatList
                            data={this.state.Courseslist}
                            renderItem={({ item }) => (


                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("Course_details", {
                                            lesson_id: item.lesson_id,
                                            lesson_name: item.lesson_name

                                        })
                                        // console.log(this.state.language_type)

                                    }}

                                    style={{
                                        // height: 200,
                                        // padding: 10,
                                        width: "45%",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        // backgroundColor: "#020",
                                        borderRadius: 5,
                                        margin: 10,
                                        borderColor: "#3984bc",
                                        borderWidth: 3
                                    }}>
                                    <Image source={{ uri: item.lesson_photo }}
                                        style={{
                                            height: 250,
                                            width: "100%",
                                            backgroundColor: App_Colors.white,
                                            // resizeMode: "center"
                                            // marginVertical: 10
                                        }} />
                                    <Text style={{
                                        color: App_Colors.white,
                                        fontSize: 18, fontWeight: "bold",
                                        marginVertical: 10
                                    }}>
                                        {item.lesson_name}
                                    </Text>
                                </TouchableOpacity>

                            )}
                            numColumns={2}

                            ListEmptyComponent={() => (
                                <>
                                    <View style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 20, color: "#fff" }}>لا يوجد كورسات</Text>
                                    </View>
                                </>
                            )}
                        />
                    }
                </View>
            </>
        )
    }
}