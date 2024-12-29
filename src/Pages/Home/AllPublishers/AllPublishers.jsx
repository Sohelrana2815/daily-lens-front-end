import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import usePublishers from "../../../Hooks/usePublishers";
const AllPublishers = () => {
  const { publishers } = usePublishers();

  return (
    <>
      <h2 className="text-center">All Publishers: {publishers.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {publishers.map((publisher) => (
          <Card key={publisher._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={publisher.publisherImage}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {publisher.publisherName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AllPublishers;
