import { UUID } from "crypto";

export default interface User {
    // exp:number,
    // iat:number,
    img:string,
    jti:string,
    main_language:string,
    token_type:string,
    user_id:UUID,
    username:string
}