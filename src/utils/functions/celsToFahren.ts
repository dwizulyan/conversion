
export default function tempConversion(temp: number, from: "celcius" | "fahrenheit" | "kelvin", to: "celcius" | "fahrenheit" | "kelvin") {
    let result: number = 0;
    if (from === to) {
        return { status: false, message: "Really ?", conversion: {} }
    }

    try {

        if (from === "celcius" && to === "fahrenheit") {
            result = (temp * 9 / 5) + 32;
        }
        else if (from === "celcius" && to === "kelvin") {
            result = temp + 273.15
        }
        else if (from === "fahrenheit" && to === "celcius") {
            result = (temp - 32) * 5 / 9
        }
        else if (from === "fahrenheit" && to === "kelvin") {
            result = ((temp - 32) * 5 / 9) + 273.15
        }
        else if (from === "kelvin" && to === "celcius") {
            result = temp - 273.15
        }
        else if (from === "kelvin" && to === "fahrenheit") {
            result = (temp - 273.15) * 9 / 5 + 32;
        }
        return { status: true, message: "Success Converting", conversion: { from: temp, to: result } }
    } catch (err) {
        if (err instanceof Error) {
            return { status: false, message: err.toString(), conversion: {} }
        }
    }
}