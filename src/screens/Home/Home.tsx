import React, { useState } from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { Text, Avatar, Button, Icon, Image } from "@rneui/themed"
import { linearGradientBanner } from "@/theme"
import * as Progress from "react-native-progress"

import { useStyles } from "./styles"
import { Wrapper } from "@/components"
import LinearGradient from "react-native-linear-gradient"

const Home = () => {
    const styles = useStyles(0)
    const { t } = useTranslation()
    const learningProgress = 0.75

    return (
        <Wrapper containerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Avatar
                    size="medium"
                    rounded
                    source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                    containerStyle={styles.avatar}
                />
                <View style={styles.rightHeader}>
                    <Text style={styles.name}>Lê Đức Minh</Text>
                    <Text style={styles.welcome}>Chào mừng đến với English AI</Text>
                </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={linearGradientBanner}
                    style={styles.banner}
                >
                    <View style={styles.leftBanner}>
                        <Text style={styles.bannerTitle}>Học tiếng Anh thông minh</Text>
                        <Text style={styles.bannerDesc}>Nâng cao kỹ năng tiếng Anh với AI, học mọi lúc mọi nơi.</Text>
                    </View>
                    <View style={styles.rightBanner}>
                        <Button
                            type="clear"
                            containerStyle={styles.bannerButton}
                            icon={{ name: "arrow-right", type: "feather", size: 28 }}
                        />
                    </View>
                </LinearGradient>
                <View style={styles.processing}>
                    <View style={styles.processingTop}>
                        <Text style={styles.processingTitle}>Chương trình đang học</Text>
                        <Icon name="arrow-right" type="feather" color={styles.iconProcessing.color} size={30} />
                    </View>
                    <View style={styles.processingBottom}>
                        <View style={styles.leftProress}>
                            <Image
                                source={require("@/assets/images/logo.png")}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.middleProcesss}>
                            <View style={styles.wrapperNameCourse}>
                                <Icon
                                    name="home-group"
                                    type="material-community"
                                    color={styles.iconProcessing.color}
                                    size={20}
                                />
                                <Text style={styles.processingNameCourse}>My Family</Text>
                            </View>
                            <Text style={styles.processingTypeCourse}>Small talk</Text>
                        </View>
                        <View style={styles.rightProcess}>
                            <Progress.Circle
                                size={60}
                                progress={learningProgress}
                                showsText={true}
                                color="#2196F3"
                                unfilledColor="#e0e0e0"
                                borderWidth={0}
                                thickness={6}
                                textStyle={{ fontSize: 16, fontWeight: "bold" }}
                                formatText={() => `${Math.round(learningProgress * 100)}%`}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Wrapper>
    )
}

export default Home
