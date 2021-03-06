import * as React from 'react';
import {Logger} from '../../../../web/js/logger/Logger';
import {RepoSidebar} from '../RepoSidebar';
import LogsContent from './LogsContent';
import CopyLogsToClipboardButton from './CopyLogsToClipboardButton';

const log = Logger.create();

export default class LogsApp extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.state = {
        };

    }

    public render() {

        return (

            <div id="doc-repository">

                <header>

                    <RepoSidebar/>

                </header>

                <div className="container-fluid">

                    <div className="row">

                        <div className="col-lg-12">

                            <div className="mb-1">
                                <CopyLogsToClipboardButton/>
                            </div>

                            <div className="mb-2">
                                <LogsContent/>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );
    }

}

export interface IProps {

}

export interface IState {

}
