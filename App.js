import { StyleSheet, Platform, SafeAreaView } from "react-native";
import { WebView as RNWebView } from "react-native-webview";

export default function App() {
  // 웹뷰 컴포넌트를 플랫폼에 따라 다르게 설정
  const WebView = Platform.OS === "web" ? "iframe" : RNWebView;

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? (
        <iframe
          src="https://artalker.netlify.app"
          // src="http://localhost:3000"
          style={{ flex: 1, width: "100%", height: "100%" }}
        />
      ) : (
        <RNWebView
          source={{ uri: "https://artalker.netlify.app" }}
          // source={{ uri: "http://localhost:3000" }}
          style={styles.webview}
        />
      )}
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
