import * as React from 'react';
import {Logger} from '../logger/Logger';
import Button from 'reactstrap/lib/Button';
import {RichTextArea} from './RichTextArea';
import {FlashcardType} from '../metadata/FlashcardType';
import Input from 'reactstrap/lib/Input';

const log = Logger.create();

class Styles {

    public static BottomBar: React.CSSProperties = {
        display: 'flex'
    };

    public static BottomBarItem: React.CSSProperties = {
        marginTop: 'auto',
        marginBottom: 'auto',
    };

    public static BottomBarItemRight: React.CSSProperties = {
        marginTop: 'auto',
        marginBottom: 'auto',
        width: '100%'
    };

    public static SelectCardType: React.CSSProperties = {
        minWidth: '10em',
        fontSize: '14px'
    };

}

export class AnnotationFlashcardBox extends React.Component<IProps, IState> {

    private fields: FlashcardInputFieldsType;

    constructor(props: IProps, context: any) {
        super(props, context);

        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            iter: 0,
            type: this.props.type || FlashcardType.BASIC_FRONT_BACK
        };

        this.fields = this.createFields(this.state.type);

    }

    public render() {

        const { id } = this.props;

        const RenderClozeFields = () => {
            return (<div>

                <RichTextArea id={`text-${id}`}
                              autofocus={true}
                              onKeyDown={event => this.onKeyDown(event)}
                              onChange={(html) => (this.fields as ClozeFields).text = html}/>

            </div>);
        };


        const RenderFrontAndBackFields = () => {
            return (<div>

                <RichTextArea label="front"
                              id={`front-${id}`}
                              autofocus={true}
                              onKeyDown={event => this.onKeyDown(event)}
                              onChange={(html) => (this.fields as FrontAndBackFields).front = html}/>

                <RichTextArea label="back"
                              id={`back-${id}`}
                              onChange={(html) => (this.fields as FrontAndBackFields).back = html}/>

            </div>);
        };

        const RenderFields = () => {

            if (this.state.type === FlashcardType.BASIC_FRONT_BACK) {
                return ( <RenderFrontAndBackFields/> );
            } else {
                return ( <RenderClozeFields/> );
            }

        };

        return (

            <div id="annotation-flashcard-box" className="">

                <RenderFields/>

                {/*FIXME: put the following buttons on the bottom of the flashcard:*/}

                {/*- select to change the flashcard type*/}

                {/*- close delete button to cloze delete a region of text*/}

                {/*- quote annotation ... to copy the annotation text.*/}

                <div style={Styles.BottomBar}>

                    <div style={Styles.BottomBarItem}>

                        <Input type="select"
                               style={Styles.SelectCardType}
                               className="p-1"
                               onChange={htmlInputElement => this.onChangeType(htmlInputElement.target.value as FlashcardType)}>

                            <option value={FlashcardType.BASIC_FRONT_BACK}>Front and back</option>
                            <option value={FlashcardType.CLOZE}>Cloze</option>

                        </Input>

                    </div>

                    <div style={Styles.BottomBarItemRight}
                         className="text-right">

                        <Button color="secondary" size="sm" className="" onClick={() => this.onCancel()}>
                            Cancel
                        </Button>

                        <Button color="primary" size="sm" className="ml-1" onClick={() => this.onCreate()}>
                            Create
                        </Button>

                    </div>

                </div>

            </div>

        );

    }

    private onKeyDown(event: KeyboardEvent) {

        // if (event.key === "Escape") {
        //     this.toggle();
        // }

        if (event.getModifierState("Control") && event.key === "Enter") {
            this.onCreate();
        }

    }

    private onChangeType(type: FlashcardType) {
        this.fields = this.createFields(type);
        this.setState({...this.state, type});
    }

    private onCreate(): void {

        if (this.props.onFlashcardCreated) {
            this.props.onFlashcardCreated(this.state.type, this.fields);
        }

        this.reset();

        this.setState({
            iter: this.state.iter + 1
        });

    }

    private onCancel(): void {

        if (this.props.onCancel) {
            this.props.onCancel();
        }

        this.reset();

    }

    private reset(): void {
        this.fields = this.createFields(this.state.type);
    }

    private createFields(type: FlashcardType): FlashcardInputFieldsType {

        if (type === FlashcardType.BASIC_FRONT_BACK) {
            const result: FrontAndBackFields = {front: "", back: ""};
            return result;
        } else {
            const result: ClozeFields = {text: ""};
            return result;
        }

    }

}

export interface IProps {
    readonly id: string;
    readonly type?: FlashcardType;
    readonly onFlashcardCreated?: (type: FlashcardType, fields: Readonly<FlashcardInputFieldsType>) => void;
    readonly onCancel?: () => void;
}

export interface IState {
    readonly iter: number;
    readonly type: FlashcardType;
}

export type htmlstring = string;

export type FlashcardInputFieldsType = FrontAndBackFields | ClozeFields;

export interface ClozeFields {
    text: htmlstring;
}

export interface FrontAndBackFields {
    front: htmlstring;
    back: htmlstring;
}
