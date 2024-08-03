import React from 'react';
import { Badge } from './badge';

export interface Props {
    name?: string;
    version?: string;
}


const VersionBadge = ({ name, version }: Props) => (
    <div className="flex gap-0 w-fit">
        <Badge className="bg-black text-white rounded-r-none" > {name} </Badge>
        <Badge className="bg-white text-black border-black rounded-l-none" > {version} </Badge>
    </div>
);

export default VersionBadge;
