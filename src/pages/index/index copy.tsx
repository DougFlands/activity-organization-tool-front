import { useCallback } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useNavigationBar, useModal, useToast } from "taro-hooks";
import logo from "./hook.png";
import "taro-ui/dist/style/index.scss";
import { AtTabBar } from "taro-ui";

import "./index.scss";

const Index = () => {
  const [state, setState] = useState(initialState);

  const [_, { setTitle }] = useNavigationBar({ title: "Taro Hooks" });
  const [show] = useModal({
    page: 1,
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true
  });

  // const handleModal = useCallback(() => {
  //   show({ content: "不如给一个star⭐️!" }).then(() => {
  //     showToast({ title: "点击了支持!" });
  //   });
  // }, [show, showToast]);

  const handleClick = () => {};

  return (
    <View className="wrapper">
      <AtTabBar
        tabList={[
          { title: "待办事项", text: 8 },
          { title: "拍照" },
          { title: "通讯录", dot: true }
        ]}
        onClick={handleClick}
        current={this.state.current}
      />
    </View>
  );
};

export default Index;
