// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
    export interface DefaultTheme {
        tgBtn: string;
        bgColor: string;
        textColor: string;
        accentColor: string;
    }

    export interface DarkTheme {
        tgBtn: string;
        bgColor: string;
        textColor: string;
        accentColor: string;
    }
    export interface LightTheme {
        tgBtn: string;
        bgColor: string;
        textColor: string;
        accentColor: string;
    }
}
