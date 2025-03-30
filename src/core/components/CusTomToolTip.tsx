import React, { useCallback, useRef, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions, Platform } from "react-native";
import { Divider, makeStyles, useTheme } from "@rneui/themed";
import { fontSize, lineHeight } from "../theme";
import { device } from "../utils";

interface CustomTooltipProps {
    children: React.ReactNode;
    content: string;
    contentTranslated?: string;
}
const { width, height } = device();

const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, content, contentTranslated }) => {
    const styles = useStyles()
    const { theme } = useTheme();
    const buttonRef = useRef<View>(null);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const top = useRef(0);

    const handlePress = useCallback(() => {
        buttonRef.current?.measureInWindow((x, y, w, h) => {
            top.current = (y + h > height / 2 ? y - 150 : y + h + 10) - (Platform.OS === "ios" ? 105 : 0);
            setTooltipVisible(true);
        });
    }, [buttonRef]);

    return (
        <>
            <View ref={buttonRef}>
                <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>
            </View>

            {tooltipVisible && (
                <Modal transparent visible animationType="fade">
                    <TouchableOpacity style={styles.overlay} onPress={() => setTooltipVisible(false)}>
                        <View
                            style={[
                                styles.tooltip,
                                {
                                    top: top.current,
                                    backgroundColor: theme.colors.grey5,
                                },
                            ]}
                        >
                            <View style={styles.containerTooltip}>
                                <Text style={styles.content}>{content}</Text>
                                <Divider color={theme.colors.primary} />
                                <Text style={styles.content}>{contentTranslated ?? ""}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </>
    );
};

export default CustomTooltip;

const useStyles = makeStyles(({ colors },) => {
    return {
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.52)",
        },
        tooltip: {
            position: "absolute",
            width: width * 1,
            padding: 10,
            borderRadius: 8,
        },
        containerTooltip: {
            gap: 8,
        },
        content: {
            fontSize: fontSize.normal,
            lineHeight: lineHeight.large,
            color: colors.black
        },
    }
});
