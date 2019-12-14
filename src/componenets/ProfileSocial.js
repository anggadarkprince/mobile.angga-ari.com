import {Card, Icon, Text} from "@ui-kitten/components";
import React from "react";
import {Linking, TouchableOpacity, View} from "react-native";

export default (props) => {
    let icon = 'globe-outline';
    let background = '#ccc';

    switch(props.type) {
        case 'facebook':
            icon = 'facebook';
            background = '#3b5999';
            break;
        case 'twitter':
            icon = 'twitter';
            background = '#55acee';
            break;
        case 'behance':
            icon = 'behance';
            background = '#053eff';
            break;
        case 'linkedin':
            icon = 'linkedin';
            background = '#0077B5';
            break;
        case 'github':
            icon = 'github';
            background = '#211F1F';
            break;
        case 'google':
            icon = 'google';
            background = '#dd4b39';
            break;
    }

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
            <View style={{marginHorizontal: 5, padding: 6, borderRadius: 40, backgroundColor: background}}>
                <Icon name={icon} width={30} height={30} fill='#fff' style={{borderRadius: 100}} />
            </View>
        </TouchableOpacity>
    )
}
