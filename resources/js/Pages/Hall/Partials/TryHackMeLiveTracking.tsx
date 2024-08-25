import React from "react";

const TryHackMeLiveTracking = () => {
    const noCacheUrl = `Karamasow.png?t=${new Date().getTime()}`;
    return (
        <div className="flex flex-row mt-px">
            <img
                src={`https://tryhackme-badges.s3.amazonaws.com/${noCacheUrl}`}
                alt="TryHackMe"
            />
        </div>
    );
};

export default TryHackMeLiveTracking;
