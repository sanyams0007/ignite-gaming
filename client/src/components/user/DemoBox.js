import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import AdminIcon from "@material-ui/icons/SupervisedUserCircle";

const useStyles = makeStyles((theme) => ({
  demoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  text: {
    padding: "0 20px",
  },
  line: {
    flexGrow: "1",
    margin: "0",
    border: "none",
    borderTop: "1px solid rgba(255, 255, 255,0.25)",
    clear: "both",
  },
  demoBtn: {
    border: "none",
    minWidth: "50px",
    padding: "5px 8px",
    borderRadius: "6px",
    fontSize: "unset",
    cursor: "pointer",
  },
}));

const DemoBox = ({ handleDemoUser, handleDemoAdmin }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.demoBox} style={{ margin: "8px 0" }}>
        <hr className={classes.line} />
        <div className={classes.text}>Or Try Demo</div>
        <hr className={classes.line} />
      </div>
      <div className={classes.demoBox}>
        <Chip
          className={classes.demoBtn}
          component="button"
          color="primary"
          label="User"
          icon={<PersonIcon />}
          onClick={handleDemoUser}
          style={{ background: "#303a52" }}
        />
        <Chip
          className={classes.demoBtn}
          component="button"
          color="primary"
          label="Admin"
          icon={<AdminIcon />}
          onClick={handleDemoAdmin}
          style={{ background: "#c03546" }}
        />
      </div>
    </>
  );
};

export default DemoBox;
