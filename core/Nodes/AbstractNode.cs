using OpenCvSharp;

namespace core.Nodes
{
    public abstract class AbstractNode {
        public abstract Mat run(Mat img);
    }
}