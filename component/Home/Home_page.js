import React from "react"
import {
    View, Text, TouchableOpacity,

    StatusBar, Image, TextInput, FlatList, ToastAndroid, ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../../constants/Theme"
import Icon from "react-native-vector-icons/FontAwesome5"

import Images from "../../constants/Images"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import { Image } from "react-native-elements"
import axios from "axios"
export default class Home_page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            All_courses: [],
            loading: false,
            user: {}
            // {
            //     language_title: "تعلم لغه HTML",
            //     view: false,
            //     language_image: Images.Images.Html_photo,
            //     course_question: [{
            //         course_question: "Who is the father of HTML?",
            //         answer: "Rasmus Lerdorf//Tim Berners-Lee//Brendan Eich//Sergey Brin",
            //         checkanswer: "Tim Berners-Lee"
            //     },

            //     {
            //         course_question: "HTML stands for ",
            //         answer: " HyperText Markup Language//HyperText Machine Language//HyperText Marking Language//HighText Marking Language",
            //         checkanswer: "HyperText Markup Language"
            //     }, {
            //         course_question: "What is the correct syntax of doctype in HTML5?",
            //         answer: "</doctype html>//<doctype html>//<doctype html!>//<!doctype html>",
            //         checkanswer: "<!doctype html>"
            //     },
            //     {
            //         course_question: "What is HTML?",
            //         answer: "HTML describes the structure of a webpage//HTML is the standard markup language mainly used to create web pages//HTML consists of a set of elements that helps the browser how to view the content//All of the mentioned",
            //         checkanswer: "All of the mentioned"
            //     }, {
            //         course_question: "Which of the following is used to read an HTML page and render it?",
            //         answer: "Web server//",
            //         checkanswer: ""
            //     },

            //     ],
            //     language_type: 1,
            //     language_description: " لغه تستخدم في إنشاء صفحات الويب و بالتحديد لتعيين العناصر التي سيتم وضعها  في صفحات الويب  مثل النصوص و الروابط و الصور و غيرها",
            //     language_course: [
            //         {
            //             course_title: " اصدراتHTML",


            //             course_image: Images.Images.html_version,
            //             course_description: "HTML وهي اختصار لعبارة " + "\n"
            //                 + " HyperText Markup Language" + "\n"
            //                 + " كانت أول لغة توصيف تُستخدم في صفحات الويب.وقد تطورت HTML مع مرور الوقت، ومع إطلاق الإصدارات اللاحقة منها، أصبحت معيارًا قياسيًا للغات التوصيفية.على الرغم من أنّ HTML تُعد معيارًا أكثر منها لغة واحدة محددة، إلا أنّ الإصدارات السابقة للإصدار HTML4 يشار إليها عمومًا باسم HTML وحسب.هذا بسبب الحاجة إلى التمييز بينها وبين التغييرات الرئيسية التي أدخلتها HTML5، وهو الإصدار الأحدث من HTML." +
            //                 "قبل إصدار HTML5، بدأ اتحاد الشبكة العالمية World Wide Web Consortium (المعروف أيضًا باسم W3C) في تطوير إصدار مُوسّع من HTML بناءً على تنسيق XML لحل بعض مشكلات التوافق في المتصفحات. XML هي معيار آخر للغات التوصيفية تشبه HTML، ولكنها أكثر صرامة منها في معالجة الأخطاء والتنسيق. تمت تسمية اللغة الناتجة XHTML،" + "\n" + "اختصارًا لعبارة " + "\n" + "eXtensible HyperText Markup Language." + "\n" + "وهي لغة مشابههً جدًا للغة HTML4، بيْد أنّ قواعدها أكثر صرامة."

            //         },

            //         {
            //             course_title: "ما هي لغهHTML ",
            //             course_image: Images.Images.What_html,
            //             course_description: " في البدايه HTML هي لغه بسيطه جدا تستخدم لوصف ما تحتويه من صفحات الويب ومعني ذلك انها تستخدم  في  تحديد العناصر الموجوده في الصفحات مثل  العناوين و الازرار و الصور و القوائم و الجداول  و غيرها من الاشياء التي يمكن اضافاتها في صفحات الويب \n اذا نستخدم هذه اللغه لهدف واحد فقط و هو تحديد بنيه صفحات الويب الان عليك معرفه ان كلمه html هي اختصار لجمله " + "\n" + " Hyper Text Markup language" + "\n" + "هذه يعني انها لا تعتبر لغه البرمجه"
            //         }, {
            //             course_title: "ماذا ستتعلم في هذه الدوره",
            //             course_image: Images.Images.What_learn_in_html,
            //             course_description: " في هذه الدوره ستتعلم الاصدار HTML5 و كل ما هو جديد فيه  لانه اهم و اخر  اصدار  يستخدم فيها " + " و اذا ستتعلم كيف تصنع البنيه الصحيحه لصفحات الويب  و ستتعرف علي كل ما يمكنك اضافته  في الصفحات  لذلك كن علي يقين انك بعد اتمام هذه الدوره  ستصبح جاهز تماما لتبدا بتعلم CSS  و متابعه تطوير نفسك" + "هل احتاج  معرفه اي شئ قبل تعلم هذه الدوره ؟ \n  اطلاقا اسلوب الشرح المعتمد في هذه الدوره لا يتطلب منك معرفه اي شئ  مسبق"
            //         }, {
            //             course_title: "اساسيات اللغه",
            //             course_image: Images.Images.fundemantal_html,
            //             course_description: " انواع الوسوم في html" + "\n" + " بشكل عام اي شئ يتم اضافته  في الصفحه يقال له وسم ال (Tag) " + " و يوجد نوعين من الوسوم :" + "\n" + "وسوم فرديه وهذه تعني انلوسوم لا يمكن وضع وسم اخر فيها مثل <br/>" + "\n" + "وسوم زوجيه و يقصد بها ان الوسم يمكن ان يوضع فيه وسوم اخري مثل الوسم<P> </P>" + "\n" + " معلزمه تقنيه"
            //         }, {
            //             course_title: "كتابه التعليقات ",
            //             course_image: Images.Images.comments_html,
            //             course_description: "التعليقات في HTML" + "\n" + "التعليق عباره عن وسم خاص  يمكنك وضعه في اي مكان تريد في الصفحه بهدف كتابه ملاحظات تساعدك في الشرح او لتذكر سبب استخدام الوسوم في حال اردت مستقبا مراجعه كود الصفحه و التعديل عليه لوضع تعليق استخدم الوسم<------!>"
            //         }, {
            //             course_title: "اكواد Html",
            //             course_image: Images.Images.html_code,
            //             course_description: "يمكن كتابه الاكواد كا التالي"
            //         },
            //     ]
            // },
            // {
            //     language_title: "تعلم لغه CSS",
            //     view: false,

            //     language_image: Images.Images.css_photo,
            //     language_type: 2,
            //     course_question: [{
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     },

            //     {
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     }, {
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     },
            //     {
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     }, {
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     },

            //     ],
            //     language_description: " لغه تستخدم في انشاء صفحات الويب و بالتحديد لتعيين العناصر التي سيتم وضعها  في صفحات الويب  مثل النصوص و الروابط و غيرها",
            //     language_course: [
            //         {
            //             course_title: " ماهي لغه CSS",

            //             course_image: Images.Images.What_css,
            //             course_description: " في البدايه كلمه CSS  هي اختصار لجمله" + "\n" + "Cascading Style Sheet" + "\n" + "\nهي لغه تستخدم في تصميم صفحات الويب فمن خلالها يمكنك تغير الوان العناصر, تحديد موقعها و احجامها و اضافه مؤاثرات لها و جعل صفحات الويب متجاوبه مع مختلف احجام الشاشات لكي تظهر بشكل ملائم للمستخدم سواء كانت يفتح الصفحه بواسطه هاتف  او تابلت" + "\n" + " بالاضافه الي الكثير من الامور التي  سنتعلمها خطوه بخطوه في هذه الصفحه"

            //         }, {
            //             course_title: " هل انا جاهز لتعلم CSS",
            //             course_image: Images.Images.ready_css,
            //             course_description: "قبل البدء بهذه الدوره يجب ان تكون متقن للغه HTML لان هذه اللغه تستخدم معاها بشكل اساسي" + "\n" + "اذال لم يسبق لك ان تعلمت لغه HTML لا تقلق ابدا لاننا اعدنا مرجه شامل لها"
            //         }, {
            //             course_title: " اصدارات لغه CSS",
            //             course_image: Images.Images.version_css,
            //             course_description: " لغه CSS يتم تطويرها باستمرار بدا من  ظهورها  ب اول مره عام 1996 حتي يومنا هذه" + "\n" + "المجموعه المسؤله عن تطوير هذه اللغه تدعي" + "World wide web consortium و في العاده تختصر بكلمه W3C" + " يوجد ثلاث اصدارات رسميه حتي اللحظه  منلغه CSS و الفكره في هذه الاصدارات ليس تغير طريقه التعامل  بل اضافه مميزات جديده عليها "
            //         }, {
            //             course_title: "فؤائد لغه CSS",
            //             course_image: Images.Images.useful_css,
            //             course_description: " سنذكر فؤائدها تبعا مع ايضاح معني كل نقطه " + "\n" + "1- توفير الوقت" + "\n" + " يمكنك وضع كود التصميم الخاص بك في ملف CSS و تضمنه نفسه في اي صفحهHTML تريد استخدامه فيها" + "\n" + "2- سرعه التحميل حين تضع كود التصميم في ملف CSS  و تضمنه في صفحات الموقع فإن المتصفح في العاده يقوم بتحميل هذا الملف مره واحده فقط و يخزن عنده بعدها ان تم الدخول لاي صفحه مربوطه بهذا الملف فإن المتصفح يستخدم النسخه التي قام بتخزينها سابقا بدل من تحميل الملف في كل مره" + "\n" + "3-سهوله التعديل بمجرد التعديل علي كود التصميم الموضوع في ملف CSS  فان كل الصفحات المربوطه به سيتم تعديل تصميمها" + "\n" + "4- خصائص متقدمه بعض الوسوم في لغهHTML تحتوي علي خصائص يمكن من خلالها التعديل علي تصميمها و لكن هذه الخصائص تعتبر لا شئ مقارنه بالخصائص التي توفرها CSSو التي يمكن تطبيقها علي جميع العناصر " + "\n" + "5- بناء صفحات متجاوبه بواسطه CSS يمكنك جعل تصميم الشاشه متجاوب  (Responsive)" + "مع مختلف احجام الشاشات التي يتم من خلالها مشاهده الصفحات لتظهر بشكل مناسب لحجم الصفحه المفتوحه عليها" + "\n" + "6-تخصيص الطباعه علي ورق لغه CSS  توفير خصائص سهله  الاستخدام  يمكنك من خلالها تحديد الشكل  الذي  ستظهره فيه  الصفحه في حال اراد المستخدم طباعتها علي ورقه " + "\n" + "7- معايير الويب العالميه الافضل دائما ان يتم وضع  تصميم صفحه الويب التي تبنيها بالاساس بكود  HTML  في ملف  CSS  منفصل عن الصفحه ذاتها و من ثم تضمنه فيها فبهذه الطريقه يمكنك استخدام ملف و التصميم في جميع صفحات موقعك و التعديل  عليها  في اي وقت  تريده بكل سهوله" + " \n" + " الاصدار الاول" + "\n" + " اصدارCSS1 فكرته الاساسيه كانت فصل كود التصميم عن كود الصفحه الذي يتم بناؤها  بواسطه HTML لامر الذي يجعلك قادر  علي  استخدام CSS  في اي صفحه تريد" +
            //                 "\n" + " الاصدار الثاني " + "\n" + "الاصدار CSS2 اضيف فيه خصائص جديده حيث بات  بالامكان التحكم بامكان  العناصر " + "\n" + "الاصدار الثالث" + "\n" +
            //                 "الاصدار CSS3  اضيف فيه خصائص تسمي  و التي  من خلالها  يمكنك Media Queries جعل حجم  الصفحه متجاوب مع مختلف احجام  الشاشات و اصبح الوصول لعناصر الصفحات  اكثر مرونه التحكم بامكان العناصر  اصبح اكبر  طرق اضافه التلوين و اصبحت بالامكان دمج الالوان اصبح بالامكان  وضع  اكثر من صوره كخلفيه  و اصبح  بالامكان عرض مؤثرات  رائعه  للعناصر كجعلها تتحرك من مكانها و تدور  و تتمدد و تتغير الوانها " +
            //                 "\n" + " اي اصدار  يجب ان نتعلم ؟" + "\n" + " من بعد ما ذكرنا لك قصه الاصدارات عليك التفكير بان عليك تعلم لغه  CSS  فقط  و دعك ممن يقول  تعلم الاصدار الفلاني فهذه كلام خاطئ لانك انت بالاساس حين تكتب كود CSS  لا تحدد رقم الاصدار الذي تتعامل معه  و غالبا ما ستستخدم خصائص من الاصدار الاول و الاصدار الثاني و الاصدارات التالث مع بعض  في اي مشروع تعمل عليه"
            //         }, {
            //             course_title: " الشكل العام لكود CSS",
            //             course_image: Images.Images.code_css,
            //             course_description: "1- الشكل العام  لكود css" + "\n" + "بدايه نحن نضيف كود css  بهدف تحسين طريقه ظهور الاشياء  المودوده في صفحه الويب  و التي تم اضافتها  الاساس بواسطه  وسوم HTML " + " من هذا المنطق فانه عند كتابه كود css  يجب تعديل الوسم المراد التعديل  علي تصميمه و من ثم  تمرير  الخصائص و القيم المناسبه له " +
            //                 " الان اذا كانت الصفحه تحتوي علي وسم<h1> يمكنك اضافه خصائص css كالتالي " + "\n" + "h1{color:blue;text-align:center;}" + "\n" + "\n" + "h1" + "\n" + "هو اسم الوسم التي سيتم اضافه خصائص CSS و له يسمي  selector" + "\n" + "Color" + "\n" + " يسمي property  و هو الخاصيه المراد تعديلها للشئ" + "\n" + "blue" + "\n" + " و هي قيمه  الخاصيه و يسمي Value" + "color:blue;" + "\n" + " الخاصيه و قيمتها مع بعض يقال لها declaration" + "\n" + " ملاحظه:" + "\n" + "يجب وضع فاصله منقوطه بعد كل خاصيه  يتم تعريفها  اخر خاصيه يمكنك عدم وضع فاصله منقوطه  لها و لكننا ننصحك بان تضعها دائما لان هذا المتعارف عليه " + "\n" + " اي تكتب كود css" + "\n" + "يوجد ثلاث اساليب يمكنك اتباعها حتي تضيف كود  css  في صفحات الويب سنذكرها لك تبعا " + "\n" + "1- اسلوب css inline" + "\n" + " اي وسم تضيفه في الصفحه يمكنك اضافه الخاصيه style له و تمرير كود ال  css  له كقيمه بشكل مباشر "

            //         },
            //     ]
            // },

            // {
            //     language_title: " تعلم لغه Python",
            //     language_image: Images.Images.python_photo,
            //     view: false,
            //     language_type: 3,
            //     course_question: [{
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     },

            //     {
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     }, {
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     },
            //     {
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     }, {
            //         course_question: "",
            //         answer: "",
            //         checkanswer: ""
            //     },

            //     ],
            //     language_description: " لغه تستخدم في انشاء صفحات الويب و بالتحديد لتعيين العناصر  التي سيتم وضعها في صفحات الويب  مثل النصوص و الروابط و غيرها",
            //     language_course: [
            //         {
            //             course_title: " ما هي لغه Python",
            //             course_image: Images.Images.what_python,
            //             course_description: "Python هي لغة برمجة تُستخدم على نطاق واسع في تطبيقات الشبكة وتطوير البرامج وعلم البيانات والتعلم الآلي (ML). يستخدم المطورون Python لأنها تتسم بالكفاءة وسهولة التعلم ويمكن تشغيلها على عديد من المنصات المختلفة. إن برنامج Python متاح للتحميل مجانًا ويتكامل جيدًا مع جميع أنواع الأنظمة ويزيد من سرعة التطوير."

            //         }, {
            //             course_title: "هل انا جاهز لتعلم Python",
            //             course_image: Images.Images.ready_python,
            //             course_description: "إذا كنت مبتدئاً في البرمجة, ننصحك بشدة أن تدرس دورة البرمجة للمبتدئين قبل البدء بهذه الدورة فتلك الدورة ستعلمك أسس البرمجة و التفكير المنطقي السليم. أي ستتعلم منها كيف تفكر و تحلل كمبرمج, كيف تكتب الكود نفسه بأكثر من طريقة، كيف يعمل أي كود يمر معك خطوة خطوة."
            //         }, {
            //             course_title: "كيف تكتب كود Python",
            //             course_image: Images.Images.python_way,
            //             course_description: "  مثال علي شكل الكود "
            //         }, {
            //             course_title: "مميزات لغه Python",
            //             course_image: Images.Images.advantage_python,
            //             course_description: "لغة مفسرة" + "\n" + "تعد Python لغة مفسرة، ما يعني أنها تدير الرموز سطرًا بسطر. إذا كانت ثمة أخطاء في رموز البرنامج، فسيتوقف عن العمل. ومن ثم، يمكن للمبرمجين إيجاد الأخطاء في الرموز بسرعة." +
            //                 "\n" + "لغة سهلة الاستخدام" + "\n" + "تستخدم Python كلمات تشبه الإنجليزية. على عكس لغات البرمجة الأخرى، لا تستخدم Python الأقواس المتعرجة. بدلاً من ذلك، تستخدم المسافة البادئة." + "\n" +
            //                 "لغة مكتوبة ديناميكيًا" + "\n" + "لا يتعين على المبرمجين الإعلان عن أنواع المتغيرات عند كتابة الرموز حيث تحددها Python في مدة العرض. بفضل هذا، يمكنك كتابة برامج Python أسرع." +
            //                 "\n" + "لغة عالية المستوى" + "\n" + "تعد Python أقرب للغات البشر من بعض لغات البرمجة الأخرى. ومن ثم، لا يتعين على المبرمجين القلق إزاء وظائفها الأساسية مثل الهندسة وإدارة الذاكرة." +
            //                 "\n" + "لغة موجَّهة بالكائنات" + "\n" + "كل شيء يُعد كائنًا بالنسبة إلى Python، لكنها تدعم كذلك أنواع أخرى من البرمجة مثل البرمجة المنظمة والوظيفية."
            //         }, {
            //             course_title: "اسلوب كتابه Python",
            //             course_image: Images.Images.how_python,
            //             course_description: "قواعد كتابة الكود في بايثون هي التالية: لا تقم بإضافة أي مسافة فارغة باستخدام الزر TAB لأن المسافة التي يعطيها هذا الزر غير مسموح إستخدامها في لغة بايثون. إستخدم 4 مسافات فارغة Space عند وضع الكود بشكل متداخل. ضع سطر فارغ على الأقل بين السطر الذي تم فيه تعريف الكلاس و الدوال المعرفة بداخله."
            //         },
            // ]
            // }

            // ]

        }
    }

    async componentDidMount() {
        let courses_data = JSON.parse(await AsyncStorage.getItem("courses_data"))
        this.setState({ user: courses_data })
        // console.log(courses_data)
        this.get_data()
        // console.log(courses_data)
    }


    get_data() {
        this.setState({ loading: true })
        axios.get("https://elearning0103.000webhostapp.com/select_courses.php").then(res => {
            // console.log(res.data)
            if (Array.isArray(res.data.massage)) {
                let arr = res.data.massage
                // console.log(arr)
                for (let i = 0; i < arr.length; i++) {
                    arr[i].view = false
                }
                this.setState({ All_courses: arr, loading: false })
                // console.log(this.state.All_courses)
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

    search_fun(searchQuery) {
        let list = this.state.All_courses;
        for (let i = 0; i < list.length; i++) {

            if (
                list[i].course_name.toLowerCase().includes(searchQuery.toLowerCase()) || list[i].course_name.toUpperCase().includes(searchQuery.toUpperCase())
            ) {
                list[i].view = false

            } else {
                list[i].view = true

            }

        }
        this.setState({ All_courses: list });





    };




    render() {
        return (
            <View style={{ backgroundColor: App_Colors.black, flex: 1 }}>
                <StatusBar backgroundColor={"#222"} />
                <View style={{ backgroundColor: '#222', justifyContent: "center" }}>
                    <View style={{
                        height: 70, width: "100%",
                        backgroundColor: "#222",
                        alignItems: "flex-end",
                        // justifyContent: "center",
                        flexDirection: "row",
                        paddingHorizontal: 15
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("Main_layout")
                            }}>
                            <Icon name="bars" size={30} color={App_Colors.white} />


                        </TouchableOpacity>

                        <Text style={{ color: App_Colors.white, margin: 5, fontSize: 20, }}> مرحبا,{this.state.user.f_name + " " + this.state.user.l_name}</Text>
                    </View>
                    <Text style={{
                        color: "#777", fontWeight: "bold",
                        textAlign: "center", width: "60%",
                        fontSize: 15,

                        marginBottom: 10
                    }}>
                        هذه الكورسات  مثاليه لك
                    </Text>
                </View>

                <View style={{
                    backgroundColor: "#ddd", flexDirection: "row",
                    alignItems: "center",
                    width: "90%",
                    alignSelf: "center",
                    marginVertical: 10,
                    borderRadius: 40,
                    padding: 10
                }}>
                    <Icon name="search" size={20} color={App_Colors.gray} />
                    <TextInput style={{
                        paddingHorizontal: 10,
                        backgroundColor: "#ddd", width: "85%",
                        alignSelf: "center",
                        // marginVertical: 10,
                        borderRadius: 10
                    }}
                        placeholder=" ابحث عن الكورس التي تريده"
                        placeholderTextColor={App_Colors.gray}
                        value={this.state.search}
                        onChangeText={(value) => {
                            this.setState({ search: value })
                            this.search_fun(value)
                        }}
                    />
                    {/* <Icon name="microphone" size={20} color={App_Colors.gray} /> */}

                </View>
                <View style={{ width: "75%", alignSelf: "center", marginVertical: 10 }}>
                    <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
                        افضل {"Application"} عربي  لتعليم البرمجه و الانظمه و الشبكات
                    </Text>
                </View>
                {this.state.loading ?
                    <View style={{
                        height: "100%",
                        width: "100%", alignItems: "center", justifyContent: "center"
                    }}>
                        <ActivityIndicator size={30} color={App_Colors.primary} />
                    </View>
                    :

                    <FlatList data={this.state.All_courses}
                        renderItem={({ item }) => (
                            item.view == false ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("Courses_list",
                                            {
                                                course_id: item.course_id

                                            })



                                    }}

                                    style={{
                                        height: App_Size.height / 2,
                                        width: "95%", backgroundColor: "#222",
                                        alignSelf: "center",
                                        borderRadius: 10,
                                        marginVertical: 10
                                    }}>

                                    <View style={{
                                        height: 60, width: '100%',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderBottomColor: "#111",
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>{item.course_name}</Text>
                                    </View>
                                    {item.course_photo == "" ? null : <Image
                                        source={item.course_photo}
                                        style={{
                                            height: "60%", width: "100%",
                                            backgroundColor: App_Colors.white,
                                            resizeMode: "contain"
                                        }} />}


                                    <View style={{ padding: 10, width: "95%", alignSelf: "center" }}>
                                        <Text style={{ color: "#fff", fontSize: 18 }}>
                                            {item.course_description}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                : null
                        )}

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
        )
    }
}