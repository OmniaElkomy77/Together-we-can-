import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window")
export const App_Colors = {
    primary: "#0962f3",
    white: "white",
    black: "#000",
    red: "#bf0909",
    gray: "#777"

}
export const App_Size = {
    width,
    height
}

const Theme = { App_Colors, App_Size }

export default Theme;
