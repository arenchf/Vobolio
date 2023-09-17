import { IconLoader3 } from "@tabler/icons-react";
import React from "react";
import "./Spinner.scss";
import colors from "../../util/colors";

function Spinner({
    color,
    justify,
    size,
}: {
    color?: string;
    justify?: string;
    size?: number;
}) {
    return (
        <div className={`c-loader-spinner ${justify ?? ""}`}>
            <IconLoader3
                color={color ?? colors.mainColor}
                size={size ?? 100}
            ></IconLoader3>
        </div>
    );
}

export default Spinner;
