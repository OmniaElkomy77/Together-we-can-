import React from "react"
import {
    View, Text, TouchableOpacity, StatusBar, FlatList, Dimensions,
    ToastAndroid, Modal,
    TouchableWithoutFeedback
} from "react-native"
import { App_Colors } from "../../constants/Theme"
import axios from "axios";
import Images from "../../constants/Images";
import LottieView from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize';
// import App from "../../App";
const { width, height } = Dimensions.get("window");
export default class Exams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: [],
            lesson_id: this.props.navigation.getParam("lesson_id"),
            loading: false,
            modalVisible1: false,
            fullDegree: "",
            score: "",
            precent: "",
            answer: false,
            modal_answer: false,
            current_index: 0,
            numerof_item: 1


        }
    }

    componentDidMount() {
        this.render_question()
    }


    render_question() {
        let data_to_send = {
            leeson_id: this.state.lesson_id
        }
        this.setState({ loading: true })
        console.log(data_to_send)
        axios.post("https://elearning0103.000webhostapp.com/select_question_with_lesson_id.php", data_to_send).then(res => {
            // console.log(JSON.stringify(res.data))
            if (res.data.status == "success") {
                if (Array.isArray(res.data.massage)) {
                    let arr = res.data.massage
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].chosen_answer = ""
                    }
                    // console.log(arr)
                    this.setState({ question: arr, loading: false })
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
        })
    }

    nextfunction() {
        let current_index = 0
        let obj_current_index = this.state.current_index
        let numerof_item = 1
        // let arr = this.state.question
        if (this.state.question.length > 0) {
            if ((obj_current_index + 1) < this.state.question.length) {
                current_index = obj_current_index + 1
                numerof_item++

                this.setState({ current_index: current_index, numerof_item: numerof_item })
            }

        }
        console.log(current_index)
        // this.setState({ current_index: current_index })

    }

    backfunction() {

        let obj_current_index = this.state.current_index
        let numerof_item = this.state.numerof_item
        let arr = this.state.question
        if (this.state.question.length >= (obj_current_index + 1)) {
            if (this.state.current_index > 0) {
                obj_current_index--
                numerof_item--
                this.setState({ current_index: obj_current_index, numerof_item: numerof_item })

            }
        }
        // console.log(current_index)
        // this.setState({ current_index: current_index })

    }




    chosen_answer(index) {

        let question_arr = this.state.question
        let current_index = this.state.current_index
        question_arr[current_index].chosen_answer =
            question_arr[current_index].question_ans[index];
        this.setState({ Questions: question_arr });


    }



    get_score() {
        let question_arr = this.state.question
        let score = 0
        let fullDegree = 0
        for (let i = 0; i < question_arr.length; i++) {
            if (question_arr[i].chosen_answer == "" || question_arr[i].chosen_answer != question_arr[i].qus_true_ans) {
                fullDegree++
            }
            if (question_arr[i].chosen_answer == question_arr[i].qus_true_ans) {
                score++
                fullDegree++
            }

        }
        let precent = (score / fullDegree) * 100;
        this.setState({ fullDegree: fullDegree, score: score, precent: precent, modalVisible1: true })

    }



    render_answer(data, index_data) {
        return (
            data.question_ans.map((item, index) => (
                <>
                    {this.state.answer ? (
                        <View
                            key={index}

                            style={{
                                height: 70,
                                width: "80%",
                                backgroundColor: data.chosen_answer == item ? "#ff9800" : "#555",
                                alignSelf: "center", borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 10
                            }}>
                            <Text style={{ fontSize: 18, color: App_Colors.white }}>
                                {item}
                            </Text>
                        </View>
                    ) :
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                // console.log(data)
                                this.chosen_answer(index)
                            }}
                            style={{
                                height: 70,
                                width: "80%",
                                backgroundColor: data.chosen_answer == item ? "#ff9800" : "#555",
                                alignSelf: "center", borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 10
                            }}>
                            <Text style={{ fontSize: 18, color: App_Colors.white }}>
                                {item}
                            </Text>
                        </TouchableOpacity >}


                </>
            ))
        )
    }

    rendermodal_answer(data) {
        return (
            data.question_ans.map((item, index) => (
                <>
                    {data.chosen_answer == data.qus_true_ans ?
                        <View
                            key={index}

                            style={{
                                height: 70,
                                width: "80%",
                                backgroundColor: data.chosen_answer == item ? "#583" : "#555",
                                alignSelf: "center", borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 10
                            }}>
                            <Text style={{ fontSize: 18, color: App_Colors.white }}>
                                {item}
                            </Text>
                        </View>
                        :
                        <View
                            key={index}

                            style={{
                                height: 70,
                                width: "80%",
                                backgroundColor: data.chosen_answer == item ? "#f00" : data.qus_true_ans == item ? "#583" : "#555",
                                alignSelf: "center", borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 10
                            }}>
                            <Text style={{ fontSize: 18, color: App_Colors.white }}>
                                {item}
                            </Text>
                        </View>
                    }
                </>
            )
            )
        )
    }











    render() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.black} barStyle={"light-content"} />
                <View style={{ flex: 1, backgroundColor: App_Colors.black }}>
                    <View style={{
                        height: 70,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#222"

                    }}>
                        <Text style={{ fontSize: 20, color: App_Colors.white, fontWeight: "bold" }}> الأسئله</Text>

                    </View>


                    <FlatList
                        data={this.state.question.slice(this.state.current_index, this.state.numerof_item)}
                        horizontal={true}
                        // showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={{
                                width: width,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#000"
                            }}>
                                <View style={{
                                    borderRadius: 8,
                                    backgroundColor: "#222",
                                    shadowColor: "#000",
                                    // marginTop: 10,
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    padding: 5,
                                    elevation: 5,
                                    width: "90%",
                                }}>
                                    <View style={{ padding: 10, justifyContent: "flex-start" }}>

                                        <Text style={{ color: App_Colors.white, fontSize: 20 }}>{"-" + " " + item.question_txt}</Text>
                                    </View>

                                    <View>

                                        {this.render_answer(item, index)}


                                    </View>
                                </View>
                            </View>

                        )}


                    />



                    <View style={{
                        height: 100, width: "100%", alignItems: "center",
                        justifyContent: "space-around", flexDirection: "row",
                        // backgroundColor: "#eee"
                    }}>

                        {this.state.current_index + 1 < this.state.question.length ?
                            <>
                                < TouchableOpacity
                                    onPress={() => {
                                        this.nextfunction()
                                    }}

                                    style={{
                                        height: 70, width: 150,
                                        backgroundColor: App_Colors.primary, borderRadius: 10,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                    <Text style={{ fontSize: 20, color: App_Colors.white, fontWeight: "bold" }}>التالي</Text>

                                </TouchableOpacity>

                                {this.state.current_index + 1 == 1 ?
                                    null :
                                    < TouchableOpacity
                                        onPress={() => {
                                            this.backfunction()
                                        }}

                                        style={{
                                            height: 70, width: 150,
                                            backgroundColor: App_Colors.primary, borderRadius: 10,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                        <Text style={{ fontSize: 20, color: App_Colors.white, fontWeight: "bold" }}>الرجوع</Text>

                                    </TouchableOpacity>

                                }
                            </>
                            :
                            this.state.current_index + 1 == this.state.question.length ?

                                this.state.answer == true ? (null) :
                                    <>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.get_score()
                                            }}

                                            style={{
                                                height: 70, width: 150,
                                                backgroundColor: App_Colors.primary, borderRadius: 10,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                            <Text style={{ fontSize: 20, color: App_Colors.white, fontWeight: "bold" }}>انتهاء</Text>

                                        </TouchableOpacity>

                                        < TouchableOpacity
                                            onPress={() => {
                                                this.backfunction()
                                            }}

                                            style={{
                                                height: 70, width: 150,
                                                backgroundColor: App_Colors.primary, borderRadius: 10,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                            <Text style={{ fontSize: 20, color: App_Colors.white, fontWeight: "bold" }}>الرجوع</Text>

                                        </TouchableOpacity>
                                    </>

                                : null
                        }
                    </View>


                </View>





                <Modal
                    visible={this.state.modalVisible1}
                    onRequestClose={() => {
                        this.setState({ modalVisible1: false });
                    }}
                    animationType="slide"

                    transparent={true}>
                    <View
                        style={{

                            backgroundColor: 'rgba(0,0,0,0.6)',
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modalVisible1: false });
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
                                height: height,
                                flex: 1,
                                justifyContent: 'space-around',
                            }}>
                            <View
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'space-around',
                                    width: '90%',
                                    backgroundColor: '#222',
                                    borderRadius: 10,
                                    elevation: 5,
                                    paddingVertical: 15,
                                    marginBottom: 10,
                                }}>
                                <View
                                    style={{
                                        height: 50,
                                        width: '100%',

                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
                                        درجه الإمتحان
                                    </Text>
                                </View>

                                {this.state.precent >= 0 && this.state.precent < 50 ?
                                    <LottieView
                                        source={Images.Images.failed}
                                        autoPlay
                                        loop
                                        style={{ height: RFValue(180), width: '100%', alignSelf: "center" }}
                                        resizeMode="contain"
                                    />

                                    :
                                    <LottieView
                                        source={Images.Images.success}
                                        autoPlay
                                        loop
                                        style={{ height: RFValue(180), width: '100%', alignSelf: "center" }}
                                        resizeMode="contain"
                                    />

                                }


                                {/* <View
                                    style={{
                                        height: 70,
                                        width: '95%',
                                        backgroundColor: '#eee',
                                        borderRadius: 20,
                                        alignSelf: 'center',
                                        padding: 10,
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}> */}

                                <View
                                    style={{
                                        // height: 70,
                                        width: '50%',
                                        padding: 10,
                                        backgroundColor: '#444',
                                        borderRadius: 20,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        alignSelf: "center"

                                    }}>

                                    <Text style={{ color: "#fff", fontSize: 18 }}>{this.state.score + "/" + this.state.fullDegree}</Text>






                                    {/* </View> */}
                                </View>

                                <View
                                    style={{
                                        height: 100,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        flexDirection: "row",
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ modalVisible1: false, answer: true })
                                        }}
                                        style={{
                                            height: 50,
                                            width: '40%',
                                            backgroundColor: App_Colors.primary,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 25,
                                        }}>
                                        <Text
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                            تم
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ modal_answer: true, answer: true, modalVisible1: false })
                                        }}
                                        style={{
                                            height: 50,
                                            width: '40%',
                                            backgroundColor: App_Colors.primary,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 25,
                                        }}>
                                        <Text
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                            الإجابات
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modalVisible1: false });
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
                    visible={this.state.modal_answer}
                    onRequestClose={() => {
                        this.setState({ modal_answer: false })

                    }}>

                    <View style={{ flex: 1, backgroundColor: "#000" }}>
                        <View style={{
                            height: 60, backgroundColor: "#222",
                            alignItems: "center", justifyContent: "center",
                            width: "100%"
                        }}>
                            <Text style={{ color: App_Colors.white, fontSize: 20, fontWeight: "bold" }}> الإمتحان  بالإجابات</Text>

                        </View>

                        <FlatList
                            data={this.state.question}

                            renderItem={({ item, index }) => (
                                <View style={{
                                    width: width,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#000"
                                }}>
                                    <View style={{
                                        borderRadius: 8,
                                        backgroundColor: "#222",
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        padding: 5,
                                        elevation: 5,
                                        width: "90%",
                                        margin: 10
                                    }}>
                                        <View style={{ padding: 10, justifyContent: "flex-start" }}>

                                            <Text style={{ color: App_Colors.white, fontSize: 20 }}>{(index + 1) + ")" + " " + item.question_txt}</Text>
                                        </View>

                                        <View>

                                            {this.rendermodal_answer(item, index)}


                                        </View>
                                    </View>
                                </View>

                            )}


                        />












                    </View>

                </Modal>


















            </>
        )
    }
}