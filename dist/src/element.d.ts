declare type element = {
    type: String;
    props: {
        nodeValue: any;
        children: Array<any>;
    };
};
declare function createElement(type: String, props: any, ...children: any): element;
export default createElement;
