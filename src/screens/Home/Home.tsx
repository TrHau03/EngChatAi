import React, { useEffect } from "react"
import { View, ScrollView, ImageSourcePropType, TouchableOpacity, Pressable, NativeModules } from "react-native"
import { useTranslation } from "react-i18next"
import { Text, Avatar, Button, Icon, Image } from "@rneui/themed"
import { linearGradientBanner } from "@/core/theme"
import * as Progress from "react-native-progress"
import { getCourses } from "@/api"

import { useStyles } from "./styles"
import { Wrapper } from "@/core/components"
import LinearGradient from "react-native-linear-gradient"
import AudioPlayer from "../../core/components/AudioPklayer"

const Home = () => {
    const styles = useStyles(0)
    const { t } = useTranslation()
    const learningProgress: number = 0.75
    const courses = getCourses()
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, width: "100%" }}>
                {/* Body */}
                <View style={styles.body}>
                    <Text style={{ fontSize: 18, margin: 16 }}>🔊 Demo Native Audio Player</Text>
                    <AudioPlayer url={audioUrl} />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={linearGradientBanner}
                        style={styles.banner}
                    >
                        <View style={styles.leftBanner}>
                            <Text style={styles.bannerTitle}>Học tiếng Anh thông minh</Text>
                            <Text numberOfLines={2} style={styles.bannerDesc}>
                                Nâng cao kỹ năng tiếng Anh với AI, học mọi lúc mọi nơi.
                            </Text>
                            <Text style={styles.bannerDesc}>Đăng nhập để học cùng AI</Text>
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
                                <Pressable
                                    onPress={() => console.log("Chương trình đang học")}
                                    style={styles.wrapperNameCourse}
                                >
                                    <Icon
                                        name="home-group"
                                        type="material-community"
                                        color={styles.iconProcessing.color}
                                        size={20}
                                    />
                                    <Text style={styles.processingNameCourse}>My Family</Text>
                                </Pressable>
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
                    <View style={styles.listSkill}>
                        <Text style={styles.title}>Kỹ năng</Text>
                        {courses.map((item) => (
                            <TouchableOpacity
                                onPress={() => console.log(item.name)}
                                key={item.id}
                                style={styles.wrapSkill}
                            >
                                <Image
                                    source={require("@/assets/images/logo.png")}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                                <View style={styles.middelWrapSkill}>
                                    <Text style={styles.processingNameCourse}>{item.name}</Text>
                                    <Text numberOfLines={1} style={styles.processingTypeCourse}>
                                        {item.description}
                                    </Text>
                                </View>
                                <Icon name="arrow-right" type="feather" color={styles.iconProcessing.color} size={30} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </Wrapper>
    )
}

export default Home
