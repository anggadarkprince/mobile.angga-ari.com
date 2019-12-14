import {Card, Text} from "@ui-kitten/components";
import React from "react";

export default (props) => {
    return (
        <Card style={[{flex: 1, marginBottom: 15, alignSelf: 'stretch', borderRadius: 8, borderColor: 'transparent'}, props.style]}>
            <Text style={{fontSize: 12, color: '#8f9bb3'}}>{props.title}</Text>
            <Text style={{fontSize: 16, fontFamily: 'Roboto-Medium'}}>
                {props.value}
            </Text>
        </Card>
    )
}
