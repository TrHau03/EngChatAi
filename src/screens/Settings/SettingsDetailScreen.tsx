import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
    screenType: "CustomizeChatUI" | "ReportIssue" | "FeedbackReview";
};

const SettingsDetailScreen = () => {
    const route = useRoute();
    const { screenType } = route.params as RouteParams;

    const renderScreen = () => {
        switch (screenType) {
            case "CustomizeChatUI":
                return <CustomizeChatUI />;
            case "ReportIssue":
                return <ReportIssue />;
            case "FeedbackReview":
                return <FeedbackReview />;
            default:
                return <Text>Màn hình không tồn tại!</Text>;
        }
    };

    return (
        <View style={{ padding: 20 }}>
            {renderScreen()}
        </View>
    );
};

const CustomizeChatUI = () => (
    <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Customize Chat UI</Text>
        <Text>Tuỳ chỉnh giao diện chat theo sở thích của bạn.</Text>
    </View>
);

const ReportIssue = () => (
    <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Report an Issue</Text>
        <Text>Báo cáo vấn đề bạn gặp phải trong ứng dụng.</Text>
    </View>
);

const FeedbackReview = () => (
    <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Feedback & Review</Text>
        <Text>Đóng góp ý kiến và đánh giá ứng dụng.</Text>
    </View>
);

export default SettingsDetailScreen;
