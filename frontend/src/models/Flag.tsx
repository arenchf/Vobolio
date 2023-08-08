import country from "../country.json";

export default interface Flag {
    code: string;
    value: string;
    flag_1x1: string;
    flag_4x3: string;
    name: string;
    label: string | React.ReactElement;
}

export const flagOptions: Flag[] = country.map((val, index) => {
    return {
        ...val,
        label: (
            <div className="select-flag-option">
                <img
                    src={`./assets/${val.flag_1x1}`}
                    alt={`${val.name} Flag`}
                    height="30px"
                    width="30px"
                />
                <div>{val.name}</div>
            </div>
        ),
        value: val.code,
    };
});

export const flagByLanguage = (language: string): Flag | undefined =>
    flagOptions.find((val) => val.code === language);
