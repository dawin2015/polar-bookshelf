import * as React from 'react';
import {Logger} from '../logger/Logger';
import Button from 'reactstrap/lib/Button';
import {RichTextArea} from './RichTextArea';
import {FlashcardType} from '../metadata/FlashcardType';
import Input from 'reactstrap/lib/Input';
import {NULL_FUNCTION} from '../util/Functions';
import {FrontAndBackFields} from './AnnotationFlashcardBox';

const log = Logger.create();

class Styles {

}

export class FlashcardFrontAndBackFields extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);
    }

    public render() {

        return (<div>

            <RichTextArea label="front"
                          id={`front-${this.props.id}`}
                          autofocus={true}
                          onKeyDown={event => this.props.onKeyDown(event)}
                          onChange={(html) => this.props.fields.front = html}
            />

            <RichTextArea label="back"
                          id={`back-${this.props.id}`}
                          onKeyDown={event => this.props.onKeyDown(event)}
                          onChange={(html) => this.props.fields.back = html}
            />

        </div>);
    };

}

export interface IProps {
    readonly id: string;
    readonly fields: FrontAndBackFields;
    readonly onKeyDown: (event: KeyboardEvent) => void;
}

export interface IState {
}

