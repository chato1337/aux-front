

export class ApiError {
    static getErrorMsg = (error: any, callbackForm: any, callbackNotify: any ) => {
        const errorList: { [key: string]: string[]; } = error.response.data

        Object.keys(errorList).forEach((keyError: string) => {
            // casting string to Object interface values
            const keyName = keyError as "name" | "id" | "description"
            callbackForm(keyName, {type: "focus"}, {shouldFocus: true})
            errorList[keyError].forEach((msg: string) => callbackNotify(`${keyName}: ${msg}`))
        })
    }

}

export class ParserNumber {
    static colDecimals = (value: number) => {
        return new Intl.NumberFormat("es-CO").format(value)
    }
}

export class ApiUtil {
    static getUrlParams = (query: any) => {
        const { queryKey } = query
        const searchQuery = queryKey[1]
        const limit = queryKey[2]
        const offset = queryKey[3]
        const order = queryKey[4]
		const args = queryKey[5]

        return { searchQuery, limit, offset, order, args }
    }
}

export class dateUtil {
    static isoParse = (date: Date) => {
        const dtf = new Intl.DateTimeFormat("es-ES", {
            calendar: "gregory",
            numberingSystem: "latn",
            day: "numeric",
            month: "numeric",
            year: "numeric",
            timeZone: "Atlantic/Canary"
        });

        return dtf.format(date);
    }
}
