import type { Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config";

const resolved = resolveConfig(tailwindConfig as Config);

type Screens = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export default function (screen: Screens) {
    const result = ref(false);

    const compare = () => {
        const screenWidth = parseInt(((resolved.theme?.screens as any)[screen]).replace("px", ""));
        result.value = screenWidth <= window.screen.width;
    };

    onMounted(() => {
        compare();

        window.addEventListener("resize", useDebounce(() => {
            compare();
        }, 1000));
    });

    return result;
}