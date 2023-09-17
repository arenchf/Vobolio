import country from "../countryNew.json";

export default interface Flag {
    code: string;
    value: string;
    flag_1x1: string;
    flag_4x3: string;
    name: string;
    // language: string;
    label: string | React.ReactElement;
}

export const flagOptions: Flag[] = country.map((val, index) => {
    return {
        ...val,
        label: (
            <div className="w-full flex flex-row gap-4 text-lg items-center">
                <img
                    src={`/assets/${val.flag_1x1}`}
                    alt={`${val.name} Flag`}
                    className="select-flag-img"
                    height="28px"
                    width="28px"
                />
                <div className="select-flag-label">{val.name}</div>
            </div>
        ),
        value: val.code,
    };
});

export const flagByLanguage = (language: string): Flag | undefined =>
    flagOptions.find((val) => val.code === language);
