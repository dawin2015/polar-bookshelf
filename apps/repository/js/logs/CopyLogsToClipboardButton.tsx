import * as React from 'react';
import {Logger} from '../../../../web/js/logger/Logger';
import ReleasingReactComponent from '../framework/ReleasingReactComponent';
import {MemoryLogger} from '../../../../web/js/logger/MemoryLogger';
import {Button} from 'reactstrap';
import {clipboard} from 'electron';
import {Toaster} from '../../../../web/js/toaster/Toaster';

const log = Logger.create();

class Styles {

}

export default class CopyLogsToClipboardButton extends ReleasingReactComponent<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);


    }


    public componentWillMount(): void {

        this.releaser.register(
            MemoryLogger.addEventListener(() => {
                this.setState({messages: MemoryLogger.toView()});
            })
        );

    }

    public render() {

        return (
            <Button size="sm" onClick={() => this.onClick()}>
                Copy to Clipboard
            </Button>
        );

    }

    private onClick() {

        const messages = MemoryLogger.toView();

        const text = messages.map(current => {

            if (current.args && current.args.length > 0) {
                const args = JSON.stringify(current.args);
                return `${current.timestamp}: ${current.msg}: ${args}`;
            } else {
                return `${current.timestamp}: ${current.msg}`;
            }

        }).join("\n");

        clipboard.writeText(text);

        Toaster.success("Wrote log output to clipboard.");

    }

}



export interface IProps {

}

export interface IState {

}
