import React, { useEffect, useRef, useState } from 'react';
import {LanguageT} from "./Convert";
// interface Ref {
//     ref: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
// }
type DropdownProps = {
    selected: LanguageT;
    label: string;
    options:  Array<LanguageT>;
    onSelectedChange: (option: LanguageT) => void;
}
// type EventI = {
//     event: MouseEvent;
//     target: Node | null;
// }
const Dropdown = ({ label, options, selected, onSelectedChange} : DropdownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const onBodyClick = (event: any) =>  {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []);

    const renderedOptions = options.map((option) => {
        if(option.value === selected.value) {
            return null;
        }
        return (
            <div
                key={ option.value }
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                { option.label }
            </div>
        );
    });
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{ label }</label>
                <div onClick={() => setOpen(!open)}
                     className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{ selected.label }</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>{ renderedOptions }</div>
                </div>

            </div>
            <div
                style={{
                    color:`${selected.value}`,
                }}>
                {selected.value}
            </div>

        </div>

    );
};

export default Dropdown;