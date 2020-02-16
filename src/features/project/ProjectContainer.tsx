import Skeleton from "antd/es/skeleton";
import * as E from "fp-ts/es6/Either";
import { pipe } from "fp-ts/es6/pipeable";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDatabase } from "src/database/useDatabase";
import { loadPersistedProject } from "../../database/persist";
import { Project } from "./Project";

export const ProjectContainer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const db = useDatabase();

  useEffect(() => {
    loadPersistedProject(+projectId, dispatch, db)().then(res =>
      pipe(
        res,
        E.fold(console.error, () => {
          setLoaded(true);
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return loaded ? <Project /> : <Skeleton />;
};
