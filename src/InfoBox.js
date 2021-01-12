import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="InfoBox">
      <CardContent className="typo">
        {/* Title i.e Corona Virus Cases */}
        <Typography>
          <h5 className="title1">{title}</h5>
          <p className="tod">Today</p>
        </Typography>
        {/* +127k Number of Cases */}
        <h2 className="info__box__cases" color="textSecondary">
          {cases}
        </h2>
        {/* Total */}
        <Typography>
          <h4 className="total__T">Total: {total} </h4>
        </Typography>
      </CardContent>
    </Card>
  );
}
export default InfoBox;
