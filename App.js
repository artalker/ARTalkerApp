import React, { useRef, useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Alert,
} from "react-native";
import { WebView as RNWebView } from "react-native-webview";
import * as Permissions from "expo-permissions";
// import Voice from "@react-native-voice/voice";

export default function App() {
  const webviewRef = useRef(null);

  const startVoiceRecognition = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") {
      Alert.alert("마이크 권한이 필요합니다");
      return;
    }

    Voice.onSpeechResults = (event) => {
      const text = event.value?.[0];
      if (text && webviewRef.current) {
        webviewRef.current.postMessage(text); // 웹뷰에 메시지 전송
      }
    };

    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error("음성인식 시작 오류:", e);
    }
  };

  // Android에서 마이크 사용 후 stop 처리
  // useEffect(() => {
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ height: 60, justifyContent: "center" }}>
        <Button title="🎤 음성 인식 시작" onPress={startVoiceRecognition} />
      </View> */}
      <RNWebView
        ref={webviewRef}
        source={{ uri: "https://artalker.netlify.app" }}
        style={styles.webview}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={(event) => {
          console.log("웹에서 보낸 메시지:", event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
