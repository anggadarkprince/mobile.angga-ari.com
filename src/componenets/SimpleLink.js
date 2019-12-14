import {Card, Icon, Text} from "@ui-kitten/components";
import React from "react";
import {Linking, TouchableOpacity, View} from "react-native";

export default (props) => {
    function onLinkPressed() {
        Linking.canOpenURL(props.url).then(supported => {
            if (supported) {
                Linking.openURL(props.url);
            } else {
                alert("Don't know how to open URI: " + props.url);
            }
        });
    }

    return (
        <TouchableOpacity onPress={onLinkPressed}>
            <Text {...props}>{props.title || props.url}</Text>
        </TouchableOpacity>
    )
}
