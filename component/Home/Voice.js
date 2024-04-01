import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    FlatList,
    ToastAndroid,
    I18nManager,
    Dimensions,
    Image,
    Animated,
    ActivityIndicator,
} from "react-native";

import Slider from "@react-native-community/slider";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer, {
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents,
} from "react-native-track-player";
import { App_Colors } from "../../constants/Theme";

const { width, height } = Dimensions.get("window");
const Record = (props) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const playbackState = usePlaybackState();
    const progress = useProgress();
    const flatListRef = React.useRef();
    const [currentIndex, setCurrentIndex] = React.useState(0);


    const [originalData, setOriginalData] = useState([]);
    const [message, setMessage] = useState([]);
    const [loading, setloading] = useState(false)

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 40,
        waitForInteraction: true,
    };
    const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        setCurrentIndex(viewableItems[0].index);
        skipTo(viewableItems[0].index);
    });

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ]);

    useEffect(() => {
        let passedData = props.navigation.getParam("sound")
        //     [
        //     {
        //         VR_id: '1',
        //         lesson_id: '1',
        //         type: 'record',
        //         title: 'التسجيل الاول',
        //         description: 'د والعدة، والمتكلمون فرقوا بينهما فقالوا الوصف يقو...',
        //         link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        //         date: '2022-05-16 20:47:56.697120',
        //     },
        //     {
        //         VR_id: '1',
        //         lesson_id: '1',
        //         type: 'record',
        //         title: 'التسجيل الاول',
        //         description: 'د والعدة، والمتكلمون فرقوا بينهما فقالوا الوصف يقو...',
        //         link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        //         date: '2022-05-16 20:47:56.697120',
        //     },
        //     {
        //         VR_id: '1',
        //         lesson_id: '1',
        //         type: 'record',
        //         title: 'التسجيل الاول',
        //         description: 'د والعدة، والمتكلمون فرقوا بينهما فقالوا الوصف يقو...',
        //         link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        //         date: '2022-05-16 20:47:56.697120',
        //     },
        //     {
        //         VR_id: '1',
        //         lesson_id: '1',
        //         type: 'record',
        //         title: 'التسجيل الاول',
        //         description: 'د والعدة، والمتكلمون فرقوا بينهما فقالوا الوصف يقو...',
        //         link: 'https://camp-coding.org/reachUpAcademy/lessons/recordes/535255137_1643453575audiofile.wav',
        //         date: '2022-05-16 20:47:56.697120',
        //     },
        // ];


        // [{"lesson_content_id": "2",
        // "lesson_content_type": "sound",
        // "lesson_content_value": "https://elearning0103.000webhostapp.com/clips/Recording.m4a",
        // "lesson_id": "1"
        // }]

        if (passedData.length == 0) {
            setMessage([]);
            setOriginalData([]);
        } else {
            setOriginalData(passedData);
            let newTracks = [];
            for (let i = 0; i < passedData.length; i++) {
                let newObj = {
                    id: passedData[i].lesson_content_id,
                    // artwork: mainImage,
                    title: passedData[i].title,
                    url: passedData[i].lesson_content_value,
                    description: passedData[i].description,
                };
                newTracks.push(newObj);
            }

            setMessage(newTracks);
            // console.log(message)
            _setUpPlayer(newTracks);
        }

        return () => {
            TrackPlayer.destroy();
        };
    }, []);

    const _setUpPlayer = async (newTracks) => {
        await TrackPlayer.setupPlayer().then(() => {
            console.log("player is setup");
        });
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                // Capability.Stop,
            ],
        });

        await TrackPlayer.add(newTracks);
    };

    const togglePlayerback = async (playbackState) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack != null) {
            if (playbackState == State.Paused) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };

    const skipTo = async (trackId) => {
        await TrackPlayer.skip(trackId);
    };

    useEffect(() => {
        if (progress.duration == 0) {
            setloading(true)
            console.log(progress.duration)
        }
        else {
            setloading(false)
        }
        if (
            playbackState == State.Playing &&
            progress.position >= progress.duration
        ) {
            TrackPlayer.seekTo(0);
        }
    }, [playbackState]);

    function _renderSlider() {
        return (
            <>


                <TouchableOpacity
                    onPress={async () => {
                        if (progress.duration) {
                            console.log(progress.duration)
                            togglePlayerback(playbackState);
                        } else {
                            ToastAndroid.showWithGravity(
                                "يجب تحميل الصوت اولاً",
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            );
                        }
                    }}
                    style={styles.recordButton}
                >
                    <AntDesign
                        name={playbackState == State.Playing ? "pausecircle" : "play"}
                        size={100}
                        color={"#fff"}
                    />
                </TouchableOpacity>



                <View
                    style={{
                        marginBottom: "10%",
                        backgroundColor: "rgba(255,255,255,255)",
                        padding: 10,
                        borderRadius: 15,
                        // flexDirection: 'row',
                        alignSelf: "center",
                        // alignItems: 'center',
                        width: "90%",
                    }}
                >

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // flex: 1,
                        }}

                    >
                        <Text
                            style={{
                                color: "#000",
                            }}
                        >
                            {progress.duration
                                ? new Date(progress.duration * 1000).toISOString().substr(14, 5)
                                : "00:00"}
                        </Text>



                        <Slider
                            style={{
                                // width: '80%',
                                height: 50,
                                flex: 1,
                            }}
                            minimumValue={0}
                            maximumValue={progress.duration}
                            value={progress.position}
                            minimumTrackTintColor="#FFD369"
                            maximumTrackTintColor="#000"
                            thumbTintColor="#FFD369"
                            onSlidingComplete={async (val) => {
                                await TrackPlayer.seekTo(val);

                                TrackPlayer.play();
                            }}
                            onValueChange={(value) => {
                                TrackPlayer.pause();
                            }}
                        />
                        <Text
                            style={{
                                color: "#000",
                            }}
                        >
                            {progress.duration
                                ? new Date(progress.position * 1000).toISOString().substr(14, 5)
                                : "00:00"}
                        </Text>

                        {/* <TouchableOpacity
                            onPress={async () => {
                                if (progress.duration) {
                                    togglePlayerback(playbackState);
                                } else {
                                    ToastAndroid.showWithGravity(
                                        "Unable to play the audio recording",
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM
                                    );
                                }
                            }}
                            style={styles.recordButton}
                        >
                            <AntDesign
                                name={playbackState == State.Playing ? "pausecircle" : "play"}
                                size={25}
                                color={"#000"}
                            />
                        </TouchableOpacity> */}




                    </View>
                </View>
            </>
        );
    }

    function _renderBody() {
        return (
            <View style={{ flex: 1, backgroundColor: "#000" }}>



                {loading ?
                    <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={30} color={App_Colors.primary} />
                    </View>
                    :
                    <FlatList
                        ref={flatListRef}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            {
                                useNativeDriver: false,
                            }
                        )}
                        viewabilityConfigCallbackPairs={
                            viewabilityConfigCallbackPairs.current
                        }
                        // onViewableItemsChanged={onViewChangeRef.current}
                        getItemLayout={(data, index) => {
                            return {
                                length: width,
                                offset: width * index,
                                index,
                            };
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        contentContainerStyle={{ alignItems: "center" }}
                        data={message}

                        keyExtractor={(_, index) => `audio-${index.toString()}`}


                        renderItem={({ item, index }) => (
                            <>
                                <View style={{ ...styles.audioContainer }}>
                                    <View
                                        style={{
                                            ...styles.indivAudioContainer,
                                        }}
                                    >
                                        {/* <Text
                                        style={{
                                            color: "#fff",
                                            margin: 10,
                                            fontWeight: "bold",
                                            fontSize: 18,
                                        }}
                                    >
                                        {item.title}
                                    </Text>


                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: 15,
                                            margin: 12,
                                            fontWeight: "700",
                                        }}
                                    >
                                        {item.description}
                                    </Text> */}
                                        {_renderSlider()}
                                    </View>

                                </View>
                            </>
                        )}
                        ListEmptyComponent={() => (
                            <View
                                style={{
                                    width: width,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#fff",
                                        alignSelf: "center",
                                        marginRight: 20,
                                    }}
                                >
                                    لا يوجد بيانات
                                </Text>
                            </View>
                        )}
                    />

                }


            </View>
        );
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: "#fff",
                        flex: 1,
                    }}
                >
                    <StatusBar
                        backgroundColor={"#222"}
                        translucent={true}
                        barStyle="light-content"
                    />

                    <View style={[styles.headerText]}>
                        {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <AntDesign name={"arrowleft"} size={25} color={"#fff"} />
            </TouchableOpacity> */}
                        <View
                            style={{
                                height: "100%",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#222"
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 20,
                                    // fontFamily: FONTS.fontFamily,
                                }}
                            >
                                {"اصوات"}
                            </Text>
                        </View>

                        <View
                            style={{
                                flex: 5,
                                alignItems: "flex-start",
                                justifyContent: "center",
                            }}
                        ></View>
                    </View>

                    {_renderBody()}
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    recordButton: {
        width: "50%",
        height: "50%",
        borderRadius: 20,
        // backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        margin: 5
    },
    noInterNet: {
        paddingTop: "80%",
        // flex: 1,
        textAlign: "center",
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    headerText: {
        height: 70,
        backgroundColor: "#000",
        width: "100%",
        // flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // paddingHorizontal: 20,

        // alignItems: 'center',
        // justifyContent: 'center',
    },
    audioContainer: {
        width: width,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000"
    },
    indivAudioContainer: {
        borderRadius: 8,
        backgroundColor: "#222",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: "90%",
    },
});
export default Record;
